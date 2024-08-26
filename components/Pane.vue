
<script lang="ts" setup>
import { Panel } from "@vue-flow/core";
defineProps(["graphs", "graph"]);
const isActive = ref(false);
const show = ref(false);
const emit = defineEmits(["getDetailGraph", 'openAddGraph']);
const selectGraph = (newValue: any) => {
    emit('getDetailGraph', newValue)
}
</script>

<style></style>
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
						:model-value="graph"
						@update:modelValue="(newValue) => selectGraph(newValue)"
						clearable
					></v-autocomplete>
				</div>
				<div class="basis-4/12 pl-5">
					<v-btn
						icon="mdi-plus"
						variant="outlined"
						color="green"
						@click="emit('openAddGraph')"
					></v-btn>
				</div>
			</div>
		</v-expand-x-transition>
	</Panel>
</template>
