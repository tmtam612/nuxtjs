<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import type { response } from '../types/response.js';
import type { GraphInterface, node, edge, nodeData } from '../types/graph.js';
interface CustomNode {
    children: Array<node>;
    id?: string;
    type?: string;
    position?: any;
    data?: nodeData;
}
interface TimelineItem {
    [key: number | string]: CustomNode;
}
const items = reactive([
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
]);
const elements = ref([]);
const nodes = ref<Array<any>>([]);
const getDetailGraph = async (value: number) => {
    try {
        const response: response = await $fetch(
            `/api/get-detail-graph/${value}`,
            {
                method: 'get',
            }
        );
        if (response.statusCode === 200 && response.payload) {
            elements.value = response.payload;
            if (
                response.payload.detailGraph &&
                response.payload.detailGraph.nodes
            ) {
                const items = response.payload.detailGraph.nodes;
                const parentNodes = items
                    .filter((node: node) => node.data.isParent)
                    .sort(
                        (a: node, b: node) => a.data.order_no - b.data.order_no
                    );
                const childrenNodes = items
                    .filter((node: node) => !node.data.isParent)
                    .sort(
                        (a: node, b: node) =>
                            a.data.parentId - b.data.parentId ||
                            a.data.order_no - b.data.order_no
                    );
                const result: TimelineItem = {};
            }
            // updateGraphIDToURL(response.payload);
        }
    } catch (err) {
        console.log(err);
    }
};
onBeforeMount(async () => {
    try {
        await getDetailGraph(1);
        console.log(elements.value);
        console.log(nodes.value);
        // const id: string = route.query.id?.toString() || '';
        // if (id !== '') {
        //     graph.value = graphs.value.find(
        //         (item: GraphInterface) => item.id === parseInt(id)
        //     );
        //     if (graph.value) {
        //         await getDetailGraph(parseInt(id));
        //     }
        // }
    } catch (err) {
        console.log(err);
    }
});
</script>
<template>
    <div class="container h-full m-auto">
        <v-timeline truncate-line="both">
            <v-timeline-item
                v-for="(item, key) in items"
                :key="key"
                :dot-color="item.color"
                :icon="item.icon"
                fill-dot
            >
                <template v-slot:opposite>
                    <div
                        v-if="key % 2 === 0"
                        :class="`pt-1 headline font-weight-bold`"
                        v-text="key"
                    ></div>
                </template>
                <v-card>
                    <v-card-title :class="['text-h6', `bg-${item.color}`]">
                        Lorem Ipsum Dolor
                    </v-card-title>
                    <v-card-text class="bg-white text--primary">
                        <p>
                            Lorem ipsum dolor sit amet, no nam oblique veritus.
                            Commune scaevola imperdiet nec ut, sed euismod
                            convenire principes at. Est et nobis iisque
                            percipit, an vim zril disputando voluptatibus, vix
                            an salutandi sententiae.
                        </p>
                        <v-btn :color="item.color" variant="outlined">
                            Button
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>
