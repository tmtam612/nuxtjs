<script setup>
import { ref } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
defineProps(['label', 'data']);
const title = ref('Milestone');
const link = ref('https://github.com/vuetifyjs/vuetify/');
const showDetail = ref(false);
const closeDialog = () => {
    showDetail.value = false;
};
</script>

<template>
    <div class="rounded-sm h-full parent-node">
        <ContentDialog
            :dialogVisible="showDetail"
            @closeDialog="closeDialog"
            :isMileStone="true"
            :title="title"
            :link="link"
        />
        <NodeResizer
            min-height="80"
            min-width="310"
            class="rounded-sm parent-node"
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
            class="inline-flex h-full w-full"
            color="black"
            variant="outlined"
            @click="showDetail = true"
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="basis-5/6">
                        <div class="mt-2">
                            <span class="text-2xl">{{ title }}</span>
                        </div>
                    </div>
                </div>
            </template>
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
<style>
.v-card-item__content {
    width: 100%;
}
</style>
