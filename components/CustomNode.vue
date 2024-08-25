<script setup>
import { Handle, Position } from '@vue-flow/core';
import { ref } from 'vue';
import { NodeResizer } from '@vue-flow/node-resizer';
import ContentDialog from './ContentDialog';
const props = defineProps(['data', 'id']);
const showDetail = ref(false);
const emit = defineEmits(['update-node']);
const closeDialog = () => {
    showDetail.value = false;
};
function updateData(form) {
    emit('update-node', { ...form, id: props.id });
}
</script>

<template>
    <div class="rounded-sm h-full content-node">
        <ContentDialog
            :dialogVisible="showDetail"
            @closeDialog="closeDialog"
            :isMileStone="data.type === 'parent'"
            :infoDetail="data"
            @updateData="updateData"
        />
        <NodeResizer
            :minHeight="data.type === 'parent' ? 80 : 200"
            :minWidth="data.type === 'parent' ? 310 : 200"
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
            class="inline-flex h-full border-strong-black w-full"
            color="yellow"
            :ripple="false"
            @click="showDetail = true"
            v-if="data.type !== 'parent'"
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="pl-5">
                        <div class="mt-2">
                            <span class="text-3xl text-wrap break-words">{{
                                data.order_no + '. ' + data.title
                            }}</span>
                        </div>
                    </div>
                </div>
            </template>

            <v-card-text
                class="bg-surface-light pt-2 h-full border-top-strong-black whitespace-normal"
            >
                <div class="block text-wrap break-words">
                    <span class="text-2xl">{{ data.content }}</span>
                </div>
                <div v-if="data.type !== 'parent'">
                    <v-list
                        :items="data.lessons"
                        class="bg-surface-light"
                    ></v-list>
                </div>
            </v-card-text>
        </v-card>
        <v-card
            class="inline-flex h-full w-full"
            color="black"
            variant="outlined"
            @click="showDetail = true"
            :ripple="false"
            v-else
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="pl-5">
                        <div class="mt-2">
                            <span class="text-3xl">{{
                                data.order_no + '. ' + data.title
                            }}</span>
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
