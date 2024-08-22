<template>
    <Panel position="top-left" class="w-50 flex">
        <div class="basis-5/6">
            <v-select
                label="Select"
                :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                ]"
            ></v-select>
        </div>
        <div class="flex basis-1/6 pl-5">
            <v-btn
                icon="mdi-plus"
                variant="elevated"
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
                        title="Add New Category"
                        color="green"
                    ></v-toolbar>

                    <v-card-text class="text-h2 pa-12">
                        <v-text-field
                            label="Category"
                            variant="underlined"
                            type="input"
                            :rules="rules"
                            clearable
                            v-model="category"
                            class="w-72"
                        ></v-text-field>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn
                            :disabled="!category"
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
    </Panel>
</template>

<script lang="ts" setup>
import { Panel } from '@vue-flow/core';
const category = ref('');
const isActive = ref(false);
const rules = ref([(value: string) => !!value || 'Required.']);
const emit = defineEmits(['updateCategory']);
const save = () => {
    isActive.value = false;
    emit('updateCategory', 1);
};
</script>

<style></style>
