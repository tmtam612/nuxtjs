<script lang="ts" setup>
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import useDragAndDrop from '../utils/useDnD';
import { useScreenshot } from '../utils/useScreenshot';
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { capture } = useScreenshot();
const { toObject, addEdges, onConnect, vueFlowRef, fromObject } = useVueFlow();
const category = ref<number | null>(null);
const updateCategory = (value: number) => {
    category.value = value;
};
async function onSave() {
    await $fetch('/api/save-graph', {
        method: 'post',
        body: JSON.stringify(toObject()),
    });
    snackbar.value = false;
}
const elements = ref([]);
const snackbar = ref(false);
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

function onPaneChange(changes: any) {
    if (changes && changes.length > 0 && !snackbar.value) {
        if (changes[0].type !== 'select') {
            snackbar.value = true;
        }
    }
}
interface node {
    id: string;
    type: string;
    position: any;
    data: any;
}
function handleNodeUpdate(updatedData: any) {
    const nodes: Array<node> = elements.value.filter(
        (item: node) => item.type === 'customNode'
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
}
</script>

<template>
    <ClientOnly>
        <div style="height: 100vh" class="dnd-flow" @drop="onDrop">
            <VueFlow
                :default-viewport="{ zoom: 0.8 }"
                :max-zoom="4"
                :min-zoom="0.1"
                @dragover="(event: DragEvent) => onDragOver(event)"
                @dragleave="onDragLeave"
                auto-connect
                @nodesChange="onPaneChange"
                @edgesChange="onPaneChange"
                v-model="elements"
            >
                <!-- <DropzoneBackground
                    :style="{
                        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                        transition: 'background-color 0.2s ease',
                    }"
                >
                    <p v-if="isDragOver">Drop here</p>
                </DropzoneBackground> -->
                <Pane :onUpdateCategory="updateCategory" />
                <template #node-customNode="nodeProps">
                    <CustomNode
                        v-bind="nodeProps"
                        @update-node="handleNodeUpdate"
                    />
                </template>
            </VueFlow>
            <Sidebar :category="category" />
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
