<script setup>
import { Handle, Position } from '@vue-flow/core';
import { ref } from 'vue';
import { NodeResizer } from '@vue-flow/node-resizer';
import ContentDialog from './ContentDialog';
defineProps(['label', 'data']);
const showDetail = ref(false);
const title = ref('Content');
const content = ref('Here is information about the lesson');
const link = ref('https://github.com/vuetifyjs/vuetify/');
const closeDialog = () => {
    showDetail.value = false;
};
</script>

<template>
    <div class="rounded-sm h-full content-node">
        <ContentDialog
            :dialogVisible="showDetail"
            @closeDialog="closeDialog"
            :isMileStone="false"
            :title="title"
            :link="link"
            :content="content"
        />
        <NodeResizer
            min-height="200"
            min-width="200"
            class="rounded-sm content-node"
        ></NodeResizer>
        <Handle
            id="target-a"
            type="target"
            :position="Position.Left"
            class="z-10"
        />
        <Handle
            id="target-b"
            type="target"
            :position="Position.Bottom"
            class="z-10"
        />
        <v-card
            class="m-auto inline-flex h-full border-strong-black"
            color="yellow"
            @click="showDetail = true"
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="mt-2">
                        <span class="text-2xl">{{ title }}</span>
                    </div>
                </div>
            </template>

            <v-card-text
                class="bg-surface-light pt-2 h-full border-top-strong-black whitespace-normal"
            >
                <div class="block break-words">
                    <span class="text-2xl">{{ content }}</span>
                </div>
            </v-card-text>
        </v-card>
        <Handle
            id="source-a"
            type="source"
            :position="Position.Right"
            class="z-10"
        />
        <Handle
            id="source-b"
            type="source"
            :position="Position.Top"
            class="z-10"
        />
    </div>
</template>
