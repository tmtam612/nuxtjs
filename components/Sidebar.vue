<script setup>
import useDragAndDrop from '../utils/useDnD';

const { onDragStart } = useDragAndDrop();
</script>

<template>
    <aside>
        <div class="text-2xl bg-cyan-darken-1 pl-2 h-14">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <span class="mt-2">Menu</span>
        </div>
        <br />
        <div class="description mt-5 mx-4">
            You can drag these nodes to the pane.
        </div>

        <div class="nodes">
            <div
                :draggable="true"
                @dragstart="onDragStart($event, 'parent')"
                class="mt-5 mx-4"
            >
                <v-card class="m-auto inline-flex" color="orange"
                    ><template v-slot:title>
                        <v-icon
                            icon="mdi-shield-star"
                            start
                            color="white"
                        ></v-icon>
                        <span class="">Milestone</span>
                    </template>
                </v-card>
            </div>

            <div
                :draggable="true"
                @dragstart="onDragStart($event, 'custom')"
                class="mt-6 mx-4"
            >
                <v-card class="m-auto inline-flex" color="blue">
                    <template v-slot:title>
                        <v-icon icon="mdi-server-plus" start></v-icon>
                        <span class="">Content</span>
                    </template>

                    <v-card-text class="bg-surface-light pt-4">
                        Here is information about the lesson
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </aside>
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
