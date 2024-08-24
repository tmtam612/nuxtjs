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
                        label="Category"
                        :items="items"
                        item-title="name"
                        item-value="id"
                        v-model="category"
                        @update:modelValue="emit('updateCategory', category)"
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
                                    v-model="inputCategory"
                                    class="w-72"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-actions class="justify-end">
                                <v-btn
                                    :disabled="!inputCategory"
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
const category = ref(null);
const inputCategory = ref(null);
const isActive = ref(false);
const show = ref(false);
const rules = ref([(value: string) => !!value || 'Required.']);
const emit = defineEmits(['updateCategory']);
const save = () => {
    isActive.value = false;
    category.value = inputCategory.value;
    emit('updateCategory', category.value);
};
const items = [
    { id: 1, name: 'California' },
    { id: 2, name: 'Colorado' },
    { id: 3, name: 'Florida' },
    { id: 4, name: 'Georgia' },
    { id: 5, name: 'Texas' },
    { id: 6, name: 'Wyoming' },
];
</script>

<style></style>
