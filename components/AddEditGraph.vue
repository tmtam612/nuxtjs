<script lang="ts" setup>
const inputGraph = ref(null);
const rules = ref([(value: string) => !!value || "Required."]);
const props = defineProps(['dialogVisible', "isEditGraph", "graph"]);
const emit = defineEmits(["addGraph", "closeDialog", "editGraph"]);
const save = () => {
	internalDialogVisible.value = false;
	if (inputGraph.value) {
        if (!props.isEditGraph) {
            emit("addGraph", inputGraph.value);
        } else {
            emit("editGraph", inputGraph.value);
        }
	}
};
const internalDialogVisible = computed({
	get: () => props.dialogVisible,
	set: (value) => {
		if (!value) {
			emit("closeDialog");
		}
	},
});
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
			<v-toolbar :title="isEditGraph ? `Edit Graph: ${graph.name}` : 'Add New Graph'" color="green"></v-toolbar>

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
					@click="internalDialogVisible = false"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
