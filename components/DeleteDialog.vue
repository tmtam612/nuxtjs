<script lang="ts" setup>
const props = defineProps(["dialogVisible"]);
const emit = defineEmits(["closeDialog", "delete"]);
const internalDialogVisible = computed({
	get: () => props.dialogVisible,
	set: (value) => {
		if (!value) {
			emit("closeDialog");
		}
	},
});
const closeDialog = () => {
	internalDialogVisible.value = false;
};
const submitDelete = () => {
	emit("delete");
	closeDialog();
};
</script>
<template>
	<v-dialog max-width="500" v-model="internalDialogVisible">
		<v-card title="Delete">
			<v-card-text> Are you sure want to delete? </v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					color="red"
					text="Delete"
					variant="elevated"
					@click="submitDelete"
				></v-btn>

				<v-btn
					color="green"
					text="Cancel"
					variant="elevated"
					@click="closeDialog"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style></style>
