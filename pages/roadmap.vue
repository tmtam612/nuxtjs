<script lang="ts" setup>
import { ref } from "vue";
import {
	VueFlow,
	useVueFlow,
	useNodesData,
	useEdgesData,
} from "@vue-flow/core";
import { useDragAndDrop, setId } from "../utils/useDnD";
import { useScreenshot } from "../utils/useScreenshot";
import type { GraphInterface, node, edge } from "../types/graph.js";
import type { response } from "../types/response.js";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { capture } = useScreenshot();
const { toObject, addEdges, onConnect, vueFlowRef, fromObject, onPaneReady, viewport, setViewport } =
	useVueFlow();
const graph = ref<GraphInterface | null>();
const graphs = ref([]);
const elements = ref([]);
const snackbar = ref(false);
const openAddEditGraph = ref(false);
const openNodeDetail = ref(false);
const isEditGraph = ref(false);
const selectedNode = ref<node | null>(null);
const showRoadmap = ref<boolean>(true);
const router = useRouter();
const route = useRoute();
const roadmap = ref<{
	edges: Array<edge>;
	nodes: Array<node>;
	zoom: number;
	position: any;
	viewport: any;
} | null>(null);
const instance: any = ref(null);
onConnect((params) => {
	try {
		const source = params.source || "";
		const target = params.target || "";
		//can not connect to itself
		if (source === target) return false;

		//get child node
		const childNodes: Array<node> = elements.value.filter(
			(item: node) =>
				item.type === "customNode" &&
				!item.data.isParent &&
				(item.id === source || item.id === target),
		);

		//can not connect between 2 childrens
		if (childNodes.length >= 2) return false;

		if (childNodes.length === 1) {
			//get all parent nodes
			const parentNodes: Array<node> = elements.value.filter(
				(item: node) =>
					item.type === "customNode" && item.data.isParent,
			);
			const childNodeID = childNodes[0].id;
			for (let i = 0; i < parentNodes.length; i++) {
				const parentNodeID = parentNodes[i].id;
				const isAlreadyConnectedParentNode = elements.value.filter(
					(item: edge) => {
						return (
							item.type !== "customNode" &&
							((item.source === parentNodeID &&
								item.target === childNodeID) ||
								(item.source === childNodeID &&
									item.target === parentNodeID))
						);
					},
				);
				//can not connect to other parent node
				if (isAlreadyConnectedParentNode.length > 0) {
					return false;
				}
			}
			childNodes[0].data.parentId =
				childNodeID !== source ? parseInt(source) : parseInt(target);
		}
		addEdges([params]);
	} catch (err) {
		console.log(err);
	}
});
const updateGraphIDToURL = (payload: GraphInterface | null) => {
	if (payload && payload.id) {
		graph.value = payload;
		router.push({ query: { id: payload.id } });
	} else {
		graph.value = null;
		router.push({ query: {} });
	}
};
const fetchGraphs = async () => {
	try {
		const response: response = await $fetch("/api/get-graphs", {
			method: "get",
		});
		if (response.payload && response.statusCode === 200) {
			graphs.value = response.payload;
		}
	} catch (err) {
		console.log(err);
	}
};
onBeforeMount(async () => {
	try {
		await fetchGraphs();
		const id: string = route.query.id?.toString() || "";
		if (id !== "") {
			graph.value = graphs.value.find(
				(item: GraphInterface) => item.id === parseInt(id),
			);
			if (graph.value) {
				await getDetailGraph(parseInt(id));
			}
		}
	} catch (err) {
		console.log(err);
	}
});

const addGraph = async (value: number) => {
	try {
		const response: response = await $fetch("/api/save-graph", {
			method: "post",
			body: {
				name: value,
			},
		});
		if (response.payload && response.statusCode === 200) {
			updateGraphIDToURL(response.payload);
		}
		await fetchGraphs();
		elements.value = [];
		openAddEditGraph.value = false;
		snackbar.value = false;
	} catch (err) {
		console.log(err);
	}
};
const getDetailGraph = async (value: number) => {
	try {
		elements.value = [];
		snackbar.value = false;
		if (!value) {
			updateGraphIDToURL(null);
			return true;
		}
		const response: response = await $fetch(
			`/api/get-detail-graph/${value}`,
			{
				method: "get",
			},
		);
		if (response.statusCode === 200 && response.payload) {
			updateGraphIDToURL(response.payload);
			if (
				response.payload.currentNodeId &&
				!isNaN(response.payload.currentNodeId)
			) {
				setId(response.payload.currentNodeId);
			}
			if (response.payload.detailGraph) {
				fromObject(response.payload.detailGraph);
				roadmap.value = response.payload.detailGraph;
			}
		}
	} catch (err) {
		console.log(err);
	}
};
async function onSave(data: { isGraph: boolean; value: string } | null) {
	try {
		const content = toObject();
		const { nodes, edges, ...dimensions } = content;
		if (graph && graph.value && graph.value.id) {
			const response: response = await $fetch("/api/update-graph", {
				method: "put",
				body: {
					id: graph.value.id,
					...(data && data.isGraph
						? { name: data.value }
						: { name: graph.value.name }),
					nodes: nodes,
					edges: edges,
					dimensions: dimensions,
				},
			});
			if (data?.isGraph) {
				await fetchGraphs();
				updateGraphIDToURL(response.payload);
				openAddEditGraph.value = false;
			}
			isEditGraph.value = false;
			snackbar.value = false;
		}
	} catch (err) {
		console.log(err);
	}
}

function doScreenshot() {
	if (!vueFlowRef.value) {
		console.warn("VueFlow element not found");
		return;
	}

	capture(vueFlowRef.value, {
		shouldDownload: true,
		backgroundColor: "white",
	});
}

function onPaneChange(changes: any) {
	if (changes && changes.length > 0 && !snackbar.value) {
		if (changes[0].type !== "select" && changes[0].type !== "dimensions") {
			snackbar.value = true;
		}
	}
}

function handleNodeUpdate(updatedData: any) {
	try {
		const nodes: Array<node> = elements.value.filter(
			(item: node) => item.type === "customNode",
		);
		if (nodes.length > 0) {
			const node = nodes.find((n: node) => n.id === updatedData.id);
			if (node) {
				node.data = { ...node.data, ...updatedData };
				if (!snackbar.value) {
					snackbar.value = true;
				}
			}
		}
	} catch (err) {
		console.log(err);
	}
}
const deleteNode = (id: string) => {
	try {
		if (id && id !== "") {
			elements.value = elements.value.filter(
				(element: { id: string; source: string; target: string }) => {
					if (element.source && element.source === id) {
						return false;
					}
					if (element.target && element.target === id) {
						return false;
					}
					return element.id !== id;
				},
			);
			if (!snackbar.value) {
				snackbar.value = true;
			}
		}
	} catch (err) {
		console.log(err);
	}
};
const deleteGraph = async () => {
	try {
		if (graph.value && graph.value.id) {
			const response = await $fetch("/api/delete-graph", {
				method: "put",
				body: {
					id: graph.value.id,
				},
			});
			if (response.statusCode === 200) {
				updateGraphIDToURL(null);
				elements.value = [];
				await fetchGraphs();
			}
		}
	} catch (err) {
		console.log(err);
	}
};

const selectNode = (nodeProps: node) => {
	selectedNode.value = { ...nodeProps };
	openNodeDetail.value = true;
};
</script>

<template>
	<ClientOnly>
		<div
			v-show="showRoadmap"
			style="height: 100vh"
			class="dnd-flow"
			@drop="onDrop"
		>
			<AddEditGraph
				@addGraph="addGraph"
				@closeDialog="
					() => {
						openAddEditGraph = false;
					}
				"
				:dialogVisible="openAddEditGraph"
				:isEditGraph="isEditGraph"
				:graph="graph"
				@editGraph="onSave"
				:key="isEditGraph ? 1 : 0"
			/>
			<ContentDialog
				:dialogVisible="openNodeDetail"
				@closeDialog="() => (openNodeDetail = false)"
				:isMileStone="
					selectedNode &&
					selectedNode.data &&
					selectedNode.data.isParent
				"
				:infoDetail="selectedNode"
				@updateData="handleNodeUpdate"
				@deleteNode="deleteNode"
				v-if="selectedNode"
				:key="selectedNode && selectedNode.id ? selectedNode.id : 0"
			/>
			<VueFlow
				:default-viewport="{zoom: 0.4}"
				:max-zoom="4"
				:min-zoom="0.1"
				@dragover="(event: any) => onDragOver(event)"
				@dragleave="onDragLeave"
				@nodesChange="onPaneChange"
				@edgesChange="onPaneChange"
				v-model="elements"
                class="screenshot-flow"
			>
				<Pane
					:graphs="graphs"
					@getDetailGraph="getDetailGraph"
					:graph="graph"
					@openAddGraph="
						() => {
							openAddEditGraph = true;
							isEditGraph = false;
						}
					"
				/>
				<template #node-customNode="nodeProps">
					<CustomNode
						v-bind="nodeProps"
						@selectNode="selectNode(nodeProps)"
					/>
				</template>
			</VueFlow>
			<Sidebar
				:graph="graph"
				@download="doScreenshot"
				@save="onSave"
				@delete="deleteGraph"
				@edit="
					() => {
						isEditGraph = true;
						openAddEditGraph = true;
					}
				"
				@openTimeLine="() => showRoadmap = false"
			/>
			<v-snackbar v-model="snackbar" timeout="-1">
				you have change the map, please press save to make sure save the
				change

				<template v-slot:actions>
					<v-btn color="green" variant="text" @click="onSave">
						Save
					</v-btn>
					<v-btn color="red" variant="text" @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</div>
		<LazyTimeline
			v-if="!showRoadmap"
			@openRoadmap="
				() => {
					showRoadmap = true;
				}
			"
			:nodes="elements.filter((item: node) => item.type === 'customNode')"
		/>
	</ClientOnly>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
@import "@vue-flow/controls/dist/style.css";
@import "@vue-flow/minimap/dist/style.css";
@import "@vue-flow/node-resizer/dist/style.css";
.background-image {
	background-image: url("~/assets/img/background.svg");
	background-size: contain;
}
.vue-flow__minimap {
	transform: scale(75%);
	transform-origin: bottom right;
}

.dnd-flow {
	flex-direction: column;
	display: flex;
	height: 100%;
}

.dnd-flow .vue-flow-wrapper {
	flex-grow: 1;
	height: 100%;
}

@media screen and (min-width: 640px) {
	.dnd-flow {
		flex-direction: row;
	}

	.dnd-flow aside {
		min-width: 15%;
	}
}
</style>
