<template>
    <Panel position="top-left" class="w-50 flex">
        <v-btn
            :icon="show ? 'mdi-close' : 'mdi-menu'"
            @click="show = !show"
            color="blue"
            class="mt-1"
        ></v-btn>
        <v-expand-x-transition>
            <div class="flex rounded w-3/4" v-if="show">
                <div class="basis-8/12 pl-2">
                    <v-autocomplete
                        label="graph"
                        :items="graphs"
                        item-title="name"
                        item-value="id"
                        v-model="graph"
                        @update:modelValue="emit('getDetailGraph', graph)"
                    ></v-autocomplete>
                </div>
                <div class="basis-4/12 pl-5">
                    <v-btn
                        icon="mdi-plus"
                        variant="outlined"
                        color="green"
                        @click="isActive = true"
                    ></v-btn>
                    <v-dialog
                        transition="dialog-top-transition"
                        width="auto"
                        v-model="isActive"
                        class="rounded"
                    >
                        <v-card>
                            <v-toolbar
                                title="Add New Graph"
                                color="green"
                            ></v-toolbar>

                            <v-card-text class="text-h2 pa-12">
                                <v-text-field
                                    label="Graph"
                                    variant="underlined"
                                    type="input"
                                    :rules="rules"
                                    clearable
                                    v-model="inputGraph"
                                    class="w-72"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-actions class="justify-end">
                                <v-btn
                                    :disabled="!inputGraph"
                                    text="Save"
                                    variant="elevated"
                                    color="success"
                                    @click="save"
                                ></v-btn>
                                <v-btn
                                    text="Close"
                                    variant="outlined"
                                    color="red"
                                    @click="isActive = false"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </v-expand-x-transition>
    </Panel>
</template>

<script lang="ts" setup>
import { Panel } from '@vue-flow/core';
const graph = ref(null);
const inputGraph = ref(null);
const isActive = ref(false);
const show = ref(false);
const rules = ref([(value: string) => !!value || 'Required.']);
const emit = defineEmits(['updateGraph', 'getDetailGraph']);
const save = () => {
    isActive.value = false;
    graph.value = inputGraph.value;
    emit('updateGraph', graph.value);
};
defineProps(['graphs']);
</script>

<style></style>
