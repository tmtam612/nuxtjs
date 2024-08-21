<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core';
import { ref } from 'vue';
const props = defineProps(['label', 'data']);
const counter = ref(0);
</script>

<template>
    <div class="custom-node">
        <Handle
            type="target"
            :position="data.targetPosition ? data.targetPosition : 'left'"
        />
        <!-- <Handle
            type="target"
            :position="data.targetPosition === 'left' ? 'right' : 'left'"
        /> -->
        <div class="title">
            <button @click="counter++">{{ label }}</button>
        </div>
        <div class="result">
            <div class="content">Product Vision</div>
            <div class="content" v-for="count of counter" :key="count">
                {{ count }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-node {
    height: 100%;
    width: 300px;
    min-height: 50px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    background: white;
    border: 3px solid #dfe3e9;
    border-radius: 15px;
    gap: 10px;
}
.result {
    overflow: auto;
    max-height: 500px;
    padding-bottom: 10px;
    max-width: 800px;
}
.title {
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    justify-content: center;
    border-bottom: 3px solid #dfe3e9;
    background-color: #d0ebff;
    border-radius: 2px;
}
.content {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    margin-right: 20px;
    margin-left: 20px;
    border: 2px solid #339af0;
    border-radius: 15px;
    background-color: #e7f5ff;
}
</style>
