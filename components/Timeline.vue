<script lang="ts" setup>
import { onBeforeMount } from "vue";
import type { node } from "../types/graph.js";
const emit = defineEmits(['openRoadmap']);
const props = defineProps(['nodes']);
const timelineItem = ref<Array<node>>([]);
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
onBeforeMount(() => {
	try {
        if (props.nodes) {
            const parentNodes = getParentNodes(props.nodes);
            const childrenNodes = getChildrenNodes(props.nodes);
            timelineItem.value = arrangeNodes(parentNodes, childrenNodes);
        }
	} catch (err) {
		console.log(err);
	}
});

</script>
<template>
	<div class="container h-full m-auto">
		<div class="fixed left-5 top-1 mt-1 z-10" @click="() => emit('openRoadmap')"><v-btn icon="mdi-arrow-left"></v-btn></div>
		<v-timeline side="end">
			<v-timeline-item
				v-for="(node, key) in timelineItem"
				:key="key"
				:dot-color="node.data.isParent ? 'green' : 'white'"
				:icon="node.data.isParent ? 'mdi-book-variant' : ''"
				fill-dot
				size="small"
			>
            <template v-slot:icon v-if="!node.data.isParent">
                <v-checkbox class="pt-5 mr-10" :model-value="node.data.done" readonly color="success"></v-checkbox>
            </template>
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
				<v-card
					v-if="!node.data.isParent"
					class="custom-width h-auto h-full"
				>
					<v-card-title
						class="text-h6 bg-red custom-width whitespace-nowrap text-ellipsis overflow-hidden"
					>
						{{ node.data.title }}
						<v-tooltip activator="parent" location="bottom">{{
							node.data.title
						}}</v-tooltip>
					</v-card-title>
					<v-card-text class="bg-white text--primary overflow-hidden">
						{{ node.data.content }}
						<div>
							<v-list :items="node.data.lessons"></v-list>
						</div>
						<v-tooltip activator="parent" location="bottom">
							{{ node.data.content }}
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
