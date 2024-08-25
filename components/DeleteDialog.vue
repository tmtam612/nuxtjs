<template>
    <v-dialog max-width="500" v-model="internalDialogVisible">
        <v-card title="Delete">
            <v-card-text> Are you sure want to delete? </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red"
                    text="Save"
                    variant="elevated"
                    @click="deleteNode"
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

<script lang="ts" setup>
const props = defineProps(['dialogVisible', 'id']);
const emit = defineEmits(['closeDialog', 'deleteNode']);
const internalDialogVisible = computed({
    get: () => props.dialogVisible,
    set: (value) => {
        if (!value) {
            emit('closeDialog');
        }
    },
});
const closeDialog = () => {
    internalDialogVisible.value = false;
};
const deleteNode = () => {
    emit('deleteNode', props.id);
    closeDialog();
};
</script>

<style></style>
