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
    type Connection,
} from '@vue-flow/core';
import useDragAndDrop from '../utils/useDnD';
import { useScreenshot } from '../utils/useScreenshot';
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { capture } = useScreenshot();
const { toObject, addEdges, onConnect, vueFlowRef } = useVueFlow();
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
onConnect((params) => {
    addEdges([params]);
});
function doScreenshot() {
    if (!vueFlowRef.value) {
        console.warn('VueFlow element not found');
        return;
    }

    capture(vueFlowRef.value, { shouldDownload: true });
}
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
                @dragover="(event: DragEvent) => onDragOver(event)"
                @dragleave="onDragLeave"
                auto-connect
            >
                <DropzoneBackground
                    :style="{
                        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                        transition: 'background-color 0.2s ease',
                    }"
                >
                    <p v-if="isDragOver">Drop here</p>
                </DropzoneBackground>
                <template #node-custom="nodeProps">
                    <CustomNode v-bind="nodeProps" />
                </template>

                <template #node-parent="nodeProps">
                    <ParentNode v-bind="nodeProps" />
                </template>
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
@import '@vue-flow/node-resizer/dist/style.css';
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
