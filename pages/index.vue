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

const { onConnect, addEdges } = useVueFlow();

const nodes = ref<Node[]>([
    { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
    {
        id: '2',
        type: 'output',
        label: 'Node 2',
        position: { x: 100, y: 100 },
        targetPosition: Position.Right,
    },
    {
        id: '3',
        type: 'custom',
        label: 'Node 3',
        position: { x: 400, y: 100 },
        targetPosition: Position.Left,
    },
]);

const edges = ref<Edge[]>([
    { id: 'e1-2', source: '1', target: '2', type: 'custom' },
    { id: 'e1-3', source: '1', target: '3', animated: true },
]);

onConnect((params) => {
    addEdges([params]);
});
</script>

<template>
    <div style="height: 100vh">
        <ClientOnly>
            <VueFlow
                v-model:nodes="nodes"
                v-model:edges="edges"
                class="vue-flow-basic-example"
                :default-zoom="1.5"
                :min-zoom="0.2"
                :max-zoom="4"
            >
                <Background pattern-color="#aaa" :gap="8" />

                <template #node-custom="nodeProps">
                    <CustomNode v-bind="nodeProps" />
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
</style>
