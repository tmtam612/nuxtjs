<script setup>
import useDragAndDrop from '../utils/useDnD';

const { onDragStart } = useDragAndDrop();
</script>

<template>
    <aside>
        <div class="description">You can drag these nodes to the pane.</div>

        <div class="nodes">
            <div
                class="vue-flow__node-input root-node"
                :draggable="true"
                @dragstart="onDragStart($event, 'root')"
            >
                Root Node
            </div>

            <div
                class="vue-flow__node-default"
                :draggable="true"
                @dragstart="onDragStart($event, 'default')"
            >
                Content Node
            </div>
        </div>
    </aside>
</template>
<style>
.dnd-flow aside {
    color: #fff;
    font-weight: 700;
    border-right: 1px solid #eee;
    padding: 15px 10px;
    font-size: 12px;
    background: #10b981bf;
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
</style>
