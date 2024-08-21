<script lang="ts" setup>
import { h, ref } from 'vue';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import {
    Position,
    VueFlow,
    useVueFlow,
    type Node,
    type Edge,
} from '@vue-flow/core';
import useDragAndDrop from '../utils/useDnD';
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { toObject } = useVueFlow();
import DropzoneBackground from '../components/DropzoneBackground.vue';
import Sidebar from '../components/Sidebar.vue';
interface response {
    statusCode: number; // or whatever type you need
    payload: ResponsePayload | null; // or whatever type you need
    message: string; // or whatever type you need
}
interface ResponsePayload {
    nodes: Node[];
    edges: Edge[];
}
const response: response = await $fetch('/api/get-graph');
console.log(response);
async function onSave() {
    await $fetch('/api/save-graph', {
        method: 'post',
        body: JSON.stringify(toObject()),
    });
}

const nodes =
    response && response.payload && response.payload.nodes
        ? ref<Node[]>(response.payload.nodes)
        : ref<Node[]>([]);
const edges =
    response && response.payload && response.payload.edges
        ? ref<Edge[]>(response.payload.edges)
        : ref<Edge[]>([]);
// onPaneMouseMove((event) => {
//     console.log(event);
// });
// console.log(nodes);
// const edges = [];
// const nodes = ref<Node[]>([
//   {
//     id: "1",
//     type: "root",
//     label: "Product Thinking",
//     position: { x: 700, y: 400 },
//     data: { rootOrder: 0 },
//   },
//   {
//     id: "2",
//     type: "custom",
//     label: "Pre-launch",
//     position: { x: 100, y: 100 },
//     data: { targetPosition: Position.Right },
//   },
//   {
//     id: "3",
//     type: "custom",
//     label: "Launch",
//     position: { x: 100, y: 100 },
//     data: { targetPosition: Position.Right },
//   },
//   {
//     id: "4",
//     type: "custom",
//     label: "Success Metrix",
//     position: { x: 400, y: 100 },
//     data: { targetPosition: Position.Left },
//   },
//   {
//     id: "5",
//     type: "custom",
//     label: "Post-launch",
//     position: { x: 400, y: 100 },
//     data: { targetPosition: Position.Left },
//   },
//   {
//     id: "6",
//     type: "root",
//     label: "Design Research",
//     position: { x: 700, y: 500 },
//     data: { rootOrder: 1 },
//   },
//   {
//     id: "7",
//     type: "custom",
//     label: "Discovery",
//     position: { x: 100, y: 400 },
//     data: { targetPosition: Position.Right },
//   },
//   {
//     id: "8",
//     type: "custom",
//     label: "Types",
//     position: { x: 100, y: 400 },
//     data: { targetPosition: Position.Right },
//   },
//   {
//     id: "9",
//     type: "custom",
//     label: "Explore and Experiment",
//     position: { x: 400, y: 400 },
//     data: { targetPosition: Position.Left },
//   },
//   {
//     id: "10",
//     type: "custom",
//     label: "Planning and Analysis",
//     position: { x: 400, y: 400 },
//     data: { targetPosition: Position.Left },
//   },
// ]);

// const edges = ref<Edge[]>([
//   { id: "1", source: "2", target: "1" },
//   { id: "2", source: "3", target: "1" },
//   { id: "3", source: "1", target: "4" },
//   { id: "4", source: "1", target: "5" },
//   { id: "5", source: "7", target: "6" },
//   { id: "6", source: "8", target: "6" },
//   { id: "7", source: "6", target: "9" },
//   { id: "7", source: "6", target: "10" },
//   {
//     id: "9",
//     source: "1",
//     target: "6",
//     sourceHandle: "target-b",
//     targetHandle: "source-b",
//     animated: true,
//   },
// ]);

// onConnect((params) => {
//     const flow = getData(flowKey);
//     debugger;
//     console.log(flow);
//     if (flow) {
//         const flowObject = JSON.parse(flow);
//         fromObject(flowObject)
//     } else {
//         addEdges([params]);
//     }
// });
</script>

<template>
    <ClientOnly>
        <div style="height: 100vh" class="dnd-flow" @drop="onDrop">
            <!-- <button @click="onSave">Save me</button> -->
            <VueFlow
                :nodes="nodes"
                :edges="edges"
                :default-viewport="{ zoom: 1 }"
                :max-zoom="4"
                :min-zoom="0.1"
                @dragover="onDragOver"
                @dragleave="onDragLeave"
            >
                <template #node-custom="nodeProps">
                    <CustomNode v-bind="nodeProps" />
                </template>

                <template #node-root="nodeProps">
                    <RootNode v-bind="nodeProps" />
                </template>

                <template #edge-custom="edgeProps">
                    <CustomEdge v-bind="edgeProps" />
                </template>
                <DropzoneBackground
                    :style="{
                        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                        transition: 'background-color 0.2s ease',
                    }"
                >
                    <p v-if="isDragOver">Drop here</p>
                </DropzoneBackground>
            </VueFlow>
            <Sidebar />
        </div>
    </ClientOnly>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

/* import the required styles */
/* @import '@vue-flow/core/dist/style.css'; */

/* import the default theme (optional) */
/* @import '@vue-flow/core/dist/theme-default.css'; */

@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';
.background-image {
    background-image: url('~/assets/img/background.svg');
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

.dnd-flow aside .description {
    margin-bottom: 10px;
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
        min-width: 10%;
    }
}
</style>
