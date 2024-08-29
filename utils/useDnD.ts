import { useVueFlow } from '@vue-flow/core';
import { ref, watch } from 'vue';

let id = 0;
export function setId(value: number) {
    id = ++value;
}
/**
 * @returns {string} - A unique id.
 */
function getId() {
    return `${id++}`;
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
    /**
     * The type of the node being dragged.
     */
    draggedType: ref(null),
    isDragOver: ref(false),
    isDragging: ref(false),
};

export function useDragAndDrop() {
    const { draggedType, isDragOver, isDragging } = state;

    const {
        addNodes,
        screenToFlowCoordinate,
        onNodesInitialized,
        updateNode,
        getNodes,
    } = useVueFlow();

    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : '';
    });

    function onDragStart(event: DragEvent, type: string) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type);
            event.dataTransfer.effectAllowed = 'move';
        }

        draggedType.value = type;
        isDragging.value = true;
        console.log(event);
        document.addEventListener('drop', onDragEnd);
    }

    /**
     * Handles the drag over event.
     *
     * @param {DragEvent} event
     */
    function onDragOver(event: DragEvent) {
        event.preventDefault();

        if (draggedType.value) {
            isDragOver.value = true;

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
        }
    }

    function onDragLeave() {
        isDragOver.value = false;
    }

    function onDragEnd() {
        isDragging.value = false;
        isDragOver.value = false;
        draggedType.value = null;
        document.removeEventListener('drop', onDragEnd);
    }

    /**
     * Handles the drop event.
     *
     * @param {DragEvent} event
     */
    function onDrop(event: DragEvent) {
        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        });

        const nodeId = getId();

        const newNode = {
            id: nodeId,
            type: 'customNode',
            position,
            data: {
                title: draggedType.value === 'parent' ? 'Milestone' : 'Content',
                order_no: 1,
                content: 'Here is information about the lesson',
                lessons: [],
                link: '',
                isParent: draggedType.value === 'parent',
                parentId: 0,
                done: false
            },
        };
        /**
         * Align node position after drop, so it's centered to the mouse
         *
         * We can hook into events even in a callback, and we can remove the event listener after it's been called.
         */
        const { off } = onNodesInitialized(() => {
            updateNode(nodeId, (node) => ({
                position: {
                    x: node.position.x - node.dimensions.width / 2,
                    y: node.position.y - node.dimensions.height / 2,
                },
            }));

            off();
        });

        addNodes(newNode);
    }

    function getAllNodes() {
        return getNodes.value;
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
        getAllNodes,
    };
}
