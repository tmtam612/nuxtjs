<script setup>
import { Position, Handle } from '@vue-flow/core';

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data']);
</script>

<template>
    <div class="root-node">
        <Handle id="target-a" type="target" :position="Position.Left" />
        <Handle id="target-b" type="target" :position="Position.Bottom" />
        <div>{{ label }}</div>
        <Handle id="source-a" type="source" :position="Position.Right" />
        <Handle id="source-b" type="source" :position="Position.Top" />
    </div>
</template>

<style scoped>
.root-node {
    /* height: 100%;
    width: 100%; */
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    border: 2px solid #339af0;
    border-radius: 15px;
    overflow-wrap: break-word;
    max-width: 200px;
    /* width: 187;
    height: 54; */
}
</style>
