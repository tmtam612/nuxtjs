<script setup>
import { Handle, Position } from '@vue-flow/core';
import { ref } from 'vue';
import { NodeResizer } from '@vue-flow/node-resizer';
defineProps(['label', 'data']);
const enableInput = ref(false);
const enableTextArea = ref(false);
const title = ref('Content');
const content = ref('Here is information about the lesson');
let oldTitleValue = title.value;
let oldContentValue = content.value;
function applyNewValue(type) {
    if (type === 'title') {
        oldTitleValue = title.value;
        enableInput.value = false;
    } else {
        oldContentValue = content.value;
        enableTextArea.value = false;
    }
}
function cancelChange(type) {
    if (type === 'title') {
        title.value = oldTitleValue;
        enableInput.value = false;
    } else {
        content.value = oldContentValue;
        enableTextArea.value = false;
    }
}
</script>

<template>
    <div class="rounded-sm h-full content-node">
        <NodeResizer
            :minHeight="300"
            :minWidth="300"
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
        >
            <template v-slot:title>
                <div class="flex flex-row">
                    <div class="basis-5/6">
                        <div v-show="!enableInput" class="mt-2">
                            <span class="text-2xl">{{ title }}</span>
                        </div>
                        <v-text-field
                            v-show="enableInput"
                            label="Title"
                            variant="underlined"
                            type="input"
                            clearable
                            ref="textField"
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
                            @click="applyNewValue('title')"
                            class="mt-2"
                        ></v-btn>
                        <v-btn
                            v-if="enableInput"
                            icon="mdi-cancel"
                            variant="text"
                            :ripple="false"
                            @click="cancelChange('title')"
                            class="mt-2"
                        ></v-btn>
                    </div>
                </div>
            </template>

            <v-card-text
                class="bg-surface-light pt-2 h-full border-top-strong-black"
            >
                <div class="flex justify-end">
                    <v-btn
                        v-if="!enableTextArea"
                        icon="mdi-pencil"
                        variant="text"
                        @click="enableTextArea = true"
                        :ripple="false"
                    ></v-btn>
                    <v-btn
                        v-if="enableTextArea"
                        icon="mdi-checkbox-marked-circle"
                        variant="text"
                        :ripple="false"
                        @click="applyNewValue('content')"
                        class="mt-2"
                    ></v-btn>
                    <v-btn
                        v-if="enableTextArea"
                        icon="mdi-cancel"
                        variant="text"
                        :ripple="false"
                        @click="cancelChange('content')"
                        class="mt-2"
                    ></v-btn>
                </div>
                <div class="block">
                    <span v-if="!enableTextArea" class="text-2xl">{{
                        content
                    }}</span>
                    <v-textarea
                        v-if="enableTextArea"
                        label="Content"
                        v-model="content"
                        class="h-full"
                        ref="textAreaField"
                    ></v-textarea>
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
