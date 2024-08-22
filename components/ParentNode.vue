<script setup>
import { ref } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data']);
// const enableInput = ref(false);
// function test() {
//     enableInput.value = true;
// 	console.log(enableInput);
// }
</script>

<template>
    <div class="resize" style="resize: auto; height: 100%">
        <NodeResizer min-height="50" min-width="250" class="z-10"></NodeResizer>
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
        <v-card class="m-auto inline-flex h-auto" color="orange"
            ><template v-slot:title>
                <v-icon icon="mdi-shield-star" start color="white"></v-icon>
                <span class="">Milestone</span>
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
