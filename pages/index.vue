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
const { toObject, fromObject, onInit } = useVueFlow();
const { data } = await useFetch('/api/get-graph');
const flowKey = 'vue-flow--save-restore';
function onSave() {
    if (process.client) {
        localStorage.setItem(flowKey, JSON.stringify(toObject()));
    }
}

onInit((vueFlowInstance) => {
    // instance is the same as the return of `useVueFlow`
    //   vueFlowInstance.fitView();
    if (!process.client) return;
    const flow = localStorage.getItem(flowKey);
    if (flow) {
        const flowObject = JSON.parse(flow);
        fromObject(flowObject);
    }
});

const nodes = ref<Node[]>([
    {
        id: '1',
        type: 'root',
        label: 'Product Thinking',
        position: { x: 700, y: 400 },
        data: { rootOrder: 0 },
    },
    {
        id: '2',
        type: 'custom',
        label: 'Pre-launch',
        position: { x: 100, y: 100 },
        data: { targetPosition: Position.Right },
    },
    {
        id: '3',
        type: 'custom',
        label: 'Launch',
        position: { x: 100, y: 100 },
        data: { targetPosition: Position.Right },
    },
    {
        id: '4',
        type: 'custom',
        label: 'Success Metrix',
        position: { x: 400, y: 100 },
        data: { targetPosition: Position.Left },
    },
    {
        id: '5',
        type: 'custom',
        label: 'Post-launch',
        position: { x: 400, y: 100 },
        data: { targetPosition: Position.Left },
    },
    {
        id: '6',
        type: 'root',
        label: 'Design Research',
        position: { x: 700, y: 500 },
        data: { rootOrder: 1 },
    },
    {
        id: '7',
        type: 'custom',
        label: 'Discovery',
        position: { x: 100, y: 400 },
        data: { targetPosition: Position.Right },
    },
    {
        id: '8',
        type: 'custom',
        label: 'Types',
        position: { x: 100, y: 400 },
        data: { targetPosition: Position.Right },
    },
    {
        id: '9',
        type: 'custom',
        label: 'Explore and Experiment',
        position: { x: 400, y: 400 },
        data: { targetPosition: Position.Left },
    },
    {
        id: '10',
        type: 'custom',
        label: 'Planning and Analysis',
        position: { x: 400, y: 400 },
        data: { targetPosition: Position.Left },
    },
]);

const edges = ref<Edge[]>([
    { id: 'e1-2', source: '2', target: '1' },
    { id: 'e1-3', source: '3', target: '1' },
    { id: 'e1-4', source: '1', target: '4' },
    { id: 'e1-5', source: '1', target: '5' },
    { id: 'e6-7', source: '7', target: '6' },
    { id: 'e6-8', source: '8', target: '6' },
    { id: 'e6-9', source: '6', target: '9' },
    { id: 'e6-10', source: '6', target: '10' },
    {
        id: 'e1-6',
        source: '1',
        target: '6',
        sourceHandle: 'target-b',
        targetHandle: 'source-b',
        animated: true,
    },
]);

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
    <div style="height: 100vh" class="background-image">
        <button @click="onSave">Save me</button>
        <ClientOnly>
            <VueFlow
                :nodes="nodes"
                :edges="edges"
                class="vue-flow-basic-example"
                :default-viewport="{ zoom: 1 }"
                :max-zoom="4"
                :min-zoom="0.1"
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
            </VueFlow>
        </ClientOnly>
    </div>
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
</style>
