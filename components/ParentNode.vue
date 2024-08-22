<script setup>
import { ref } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data']);
const enableInput = ref(false);
const title = ref('Milestone');
let oldValue = title.value;
function applyNewValue() {
    oldValue = title.value;
    enableInput.value = false;
}
function cancelChange() {
    title.value = oldValue;
    enableInput.value = false;
}
</script>

<template>
    <div class="rounded-sm h-full parent-node">
        <NodeResizer
            min-height="80"
            min-width="300"
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
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="basis-5/6">
                        <div v-show="!enableInput" class="mt-2">
                            <span class="text-2xl">{{ title }}</span>
                        </div>
                        <v-text-field
                            v-if="enableInput"
                            label="Milestone"
                            variant="underlined"
                            type="input"
                            clearable
                            v-model="title"
                        ></v-text-field>
                    </div>
                    <div class="basis-1/6">
                        <v-btn
                            v-if="!enableInput"
                            icon="mdi-pencil"
                            variant="text"
                            @click="enableInput = true"
                            :ripple="false"
                        ></v-btn>
                        <v-btn
                            v-if="enableInput"
                            icon="mdi-checkbox-marked-circle"
                            variant="text"
                            :ripple="false"
                            @click="applyNewValue"
                            class="mt-2"
                        ></v-btn>
                        <v-btn
                            v-if="enableInput"
                            icon="mdi-cancel"
                            variant="text"
                            :ripple="false"
                            @click="cancelChange"
                            class="mt-2"
                        ></v-btn>
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
