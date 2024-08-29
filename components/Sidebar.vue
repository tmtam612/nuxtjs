<script setup>
import { useDragAndDrop } from '../utils/useDnD';

const { onDragStart } = useDragAndDrop();
const show = ref(true);
const props = defineProps(['graph']);
const emit = defineEmits(['download', 'save', 'delete', 'edit']);
const openDeleteDialog = ref(false);
const deleteGraph = () => {
    emit('delete');
};
const buttons = [
    {
        text: 'edit',
        color: 'purple',
        emitAction: () => emit('edit'),
        icon: 'mdi-pencil',
    },
    {
        text: 'save',
        color: 'green',
        emitAction: () => emit('save'),
        icon: 'mdi-content-save-outline',
    },
    {
        text: 'download',
        color: 'blue',
        emitAction: () => emit('download'),
        icon: 'mdi-download-circle-outline',
    },
    {
        text: 'delete',
        color: 'red',
        emitAction: () => (openDeleteDialog.value = true),
        icon: 'mdi-trash-can',
    },
];
</script>

<template>
    <div class="h-full">
        <DeleteDialog
            :dialogVisible="openDeleteDialog"
            @closeDialog="() => (openDeleteDialog = false)"
            @delete="deleteGraph"
        />
        <aside v-if="show && graph" class="h-full">
            <div class="text-2xl bg-cyan-darken-1 pl-2 h-14">
                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="show = false"
                ></v-btn>
                <span class="mt-2">Menu</span>
            </div>
            <br />
            <div class="description mt-2 mx-4">
                You can drag these nodes to the pane.
            </div>

            <div class="nodes">
                <div
                    :draggable="true"
                    @dragstart="onDragStart($event, 'parent')"
                    class="mt-5 mx-4"
                >
                    <v-card
                        class="m-auto inline-flex bg-white"
                        color="green"
                    >
                        <template v-slot:title>
                            <span class="">Milestone</span>
                        </template>
                    </v-card>
                </div>

                <div
                    :draggable="true"
                    @dragstart="onDragStart($event, 'custom')"
                    class="mt-6 mx-4"
                >
                    <v-card
                        class="m-auto inline-flex border-strong-black"
                        color="red"
                    >
                        <template v-slot:title>
                            <span class="">Content</span>
                        </template>

                        <v-card-text
                            class="bg-surface-light pt-4 h-24 border-top-strong-black"
                        >
                            Here is information about the lesson
                        </v-card-text>
                    </v-card>
                </div>
            </div>
            <div class="button-section">
                <v-divider :thickness="10"></v-divider>
                <div class="block description mt-2 mx-4">Action Button</div>
                <div
                    class="flex flex-row mt-5 pl-4"
                    v-for="(action, index) in buttons"
                >
                    <v-btn
                        :key="index"
                        :color="action.color"
                        :prepend-icon="action.icon"
                        :text="action.text"
                        variant="elevated"
                        class="rounded-full"
                        rounded
                        @click="action.emitAction()"
                    ></v-btn>
                </div>
            </div>
        </aside>
        <div v-else class="mr-4 mt-4">
            <v-btn
                icon="mdi-pencil"
                @click="show = true"
                color="blue"
                v-if="graph"
            ></v-btn>
        </div>
    </div>
</template>
<style>
.dnd-flow aside {
    color: black;
    font-weight: 700;
    border-right: 1px solid #eee;
    font-size: 12px;
    background: #e4e4e4;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0 5px 10px #0000004d;
}

.dnd-flow aside .nodes > * {
    margin-bottom: 10px;
    cursor: grab;
    font-weight: 500;
    -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 10px 2px #00000040;
}

@media screen and (max-width: 639px) {
    .dnd-flow aside .nodes {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
}

.dnd-flow aside .description {
    margin-bottom: 10px;
}
</style>
