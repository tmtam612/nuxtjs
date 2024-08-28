<script lang="ts" setup>
const props = defineProps(["dialogVisible", "isEditGraph", "graph"]);
const inputGraph = ref<null | string>(props.isEditGraph && props.graph ? props.graph.name : '');
const rules = ref([(value: string) => !!value || "Required."]);
const emit = defineEmits(["addGraph", "closeDialog", "editGraph"]);
const save = () => {
	if (inputGraph.value) {
		if (!props.isEditGraph) {
			emit("addGraph", inputGraph.value);
		} else {
			emit("editGraph", { isGraph: true, value: inputGraph.value });
		}
	}
};
const internalDialogVisible = computed({
	get: () => props.dialogVisible,
	set: (value) => {
		if (!value) {
            inputGraph.value = props.isEditGraph && props.graph ? props.graph.name : ''
			emit("closeDialog");
		}
	},
});
const handleUpdate = (newValue: string) => {
	inputGraph.value = newValue;
};
const title = props.isEditGraph && props.graph
	? `Edit Graph: ${props.graph.name}`
	: "Add New Graph";
</script>

<style></style>
<template>
	<v-dialog
		transition="dialog-top-transition"
		width="auto"
		v-model="internalDialogVisible"
		class="rounded"
	>
		<v-card>
			<v-toolbar :title="title" color="green"></v-toolbar>

			<v-card-text class="text-h2 pa-12">
				<v-text-field
					label="Graph"
					variant="underlined"
					type="input"
					:rules="rules"
					clearable
					:model-value="inputGraph"
					@update:model-value="handleUpdate"
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
					@click="internalDialogVisible = false"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
