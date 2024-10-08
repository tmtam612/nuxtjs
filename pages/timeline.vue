<script lang="ts" setup>
import { onBeforeMount } from "vue";
import type { response } from "../types/response.js";
import type { GraphInterface, node, edge, nodeData } from "../types/graph.js";

const nodes = ref<Array<node>>([]);
const arrangeNodes = (parentNodes: Array<node>, childrenNodes: Array<node>) => {
	const result: Array<node> = [];
	const nodeLength = parentNodes.length + childrenNodes.length;
	let i = 0,
		j = 0;
	while (result.length < nodeLength) {
		const parentNode = parentNodes[i];
		const childrenNode = childrenNodes[j];
		if (!parentNode && childrenNode) {
			result.push(childrenNode);
			j++;
		}
		if (!childrenNodes && parentNode) {
			result.push(parentNode);
			i++;
		}
		if (parentNode && childrenNode) {
			if (parseInt(parentNode.id) <= childrenNode.data.parentId) {
				result.push(parentNode);
				i++;
			} else {
				result.push(childrenNode);
				j++;
			}
		}
	}
	return result;
};
const getParentNodes = (nodes: Array<node>) => {
	return nodes
		.filter((node: node) => node.data.isParent)
		.sort((a: node, b: node) => a.data.order_no - b.data.order_no);
};
const getChildrenNodes = (nodes: Array<node>) => {
	return nodes
		.filter((node: node) => !node.data.isParent)
		.sort(
			(a: node, b: node) =>
				a.data.parentId - b.data.parentId ||
				a.data.order_no - b.data.order_no,
		);
};
const getDetailGraph = async (value: number) => {
	try {
		const response: response = await $fetch(
			`/api/get-detail-graph/${value}`,
			{
				method: "get",
			},
		);
		if (
			response.statusCode === 200 &&
			response.payload &&
			response.payload.detailGraph &&
			response.payload.detailGraph.nodes
		) {
			const items = response.payload.detailGraph.nodes;
			const parentNodes = getParentNodes(items);
			const childrenNodes = getChildrenNodes(items);
			nodes.value = arrangeNodes(parentNodes, childrenNodes);
		}
	} catch (err) {
		console.log(err);
	}
};
onBeforeMount(async () => {
	try {
		await getDetailGraph(29);
	} catch (err) {
		console.log(err);
	}
});
</script>
<template>
	<div class="container h-full m-auto">
		<v-timeline side="end">
			<v-timeline-item
				v-for="(node, key) in nodes"
				:key="key"
				:dot-color="node.data.isParent ? 'green' : 'red'"
				:icon="node.data.isParent ? 'mdi-book-variant' : 'mdi-star'"
				fill-dot
				size="small"
			>
				<template v-slot:opposite>
					<div
						align="right"
						v-if="node.data.isParent"
						class="pt-1 headline font-weight-bold h-full text-green whitespace-nowrap text-ellipsis overflow-hidden max-w-96 text-3xl"
					>
						{{ node.data.title }}
						<v-tooltip activator="parent" location="bottom">{{
							node.data.title
						}}</v-tooltip>
					</div>
				</template>
				<v-card v-if="!node.data.isParent" class="custom-width h-auto h-full">
					<v-card-title
						class="text-h6 bg-red custom-width whitespace-nowrap text-ellipsis overflow-hidden"
					>
						{{ node.data.title }}
						<v-tooltip activator="parent" location="bottom">{{ node.data.title }}</v-tooltip>
					</v-card-title>
					<v-card-text
						class="bg-white text--primary overflow-hidden"
					>
						{{ node.data.content }}
						<div>
							<v-list :items="node.data.lessons"></v-list>
						</div>
						<v-tooltip activator="parent" location="bottom">
                            {{ node.data.content}}
                            <v-list
								:items="node.data.lessons"
								class="bg-transparent"
							></v-list
						></v-tooltip>
					</v-card-text>
				</v-card>
			</v-timeline-item>
		</v-timeline>
	</div>
</template>
<style>
.custom-width {
	width: 36rem;
}
</style>
