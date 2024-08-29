<script setup>
import { ref } from 'vue';
import { isValidUrl } from '../utils/validation-rules';
const props = defineProps(['dialogVisible', 'infoDetail', 'isMileStone']);
const items = [
    { id: 1, name: 'California' },
    { id: 2, name: 'Colorado' },
    { id: 3, name: 'Florida' },
    { id: 4, name: 'Georgia' },
    { id: 5, name: 'Texas' },
    { id: 6, name: 'Wyoming' },
];
const setDefaultValue = () => {
    return {
        id: props.infoDetail && props.infoDetail.id ? props.infoDetail.id : '',
        order_no:
            props.infoDetail && props.infoDetail.data.order_no
                ? props.infoDetail.data.order_no
                : '',
        lessons:
            props.infoDetail && props.infoDetail.data.lessons
                ? props.infoDetail.data.lessons
                : [],
        title:
            props.infoDetail && props.infoDetail.data.title
                ? props.infoDetail.data.title
                : '',
        content:
            props.infoDetail && props.infoDetail.data.content
                ? props.infoDetail.data.content
                : '',
    };
};
const formData = ref(setDefaultValue());
const formIsValid = ref(false);
const openDeleteDialog = ref(false);
const emit = defineEmits(['closeDialog', 'updateData', 'deleteNode']);
const enableInput = ref(false);
const rules = ref({
    required: (value) => !!value || 'Required.',
    validURL: (value) => isValidUrl(value) || 'Invalid URL.',
});

const internalDialogVisible = computed({
    get: () => props.dialogVisible,
    set: (value) => {
        if (!value) {
            emit('closeDialog');
        }
    },
});
const closeDialog = () => {
    enableInput.value = false;
    internalDialogVisible.value = false;
};
const cancelEditing = () => {
    formData.value = setDefaultValue();
    enableInput.value = false;
};
const submitForm = () => {
    if (formIsValid.value) {
        emit('updateData', formData.value);
        enableInput.value = false;
    }
};
function handleUpdate(type, newValue) {
    if (formData) {
        formData.value[type] = newValue;
    }
}
const deleteNode = () => {
    emit('deleteNode', formData.value.id);
    emit('closeDialog');
};
const title = `Modify: ${props.infoDetail.data.title}`;
</script>

<template>
    <DeleteDialog
        :dialogVisible="openDeleteDialog"
        @closeDialog="() => (openDeleteDialog = false)"
        @delete="deleteNode"
    />
    <v-dialog
        transition="dialog-top-transition"
        width="700"
        class="rounded max-w-5xl"
        v-model="internalDialogVisible"
        @click:outside="closeDialog"
    >
        <v-form ref="form" v-model="formIsValid">
            <v-card
                class="m-auto inline-flex h-full border-strong-black w-full"
                :color="!isMileStone ? (enableInput ? '' : 'red') : 'green'"
            >
                <template v-slot:title>
                    <div class="flex flex-row" v-if="!enableInput">
                        <div
                            class="basis-10/12 whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                            <div
                                v-if="!enableInput"
                                class="mt-2 whitespace-nowrap text-ellipsis overflow-hidden"
                            >
                                <span class="text-3xl"
                                    >{{
                                        formData.order_no +
                                        '. ' +
                                        formData.title
                                    }}<v-tooltip
                                        activator="parent"
                                        location="bottom"
                                        >{{
                                            formData.order_no +
                                            '. ' +
                                            formData.title
                                        }}</v-tooltip
                                    ></span
                                >
                            </div>
                        </div>
                        <div class="basis-1/12">
                            <v-btn
                                v-if="!enableInput"
                                icon="mdi-pencil"
                                variant="text"
                                @click="enableInput = true"
                            ></v-btn>
                        </div>
                        <div class="basis-1/12">
                            <v-btn
                                v-if="!enableInput"
                                icon="mdi-delete"
                                variant="text"
                                @click="openDeleteDialog = true"
                            ></v-btn>
                        </div>
                    </div>
                    <div v-else class="flex flex-row">
                        <div class="pl-5">
                            <div class="mt-2">
                                <span class="text-3xl text-wrap break-words">{{
                                    title
                                }}</span>
                            </div>
                        </div>
                    </div>
                </template>

                <v-card-text
                    :class="
                        enableInput
                            ? 'bg-white h-full border-top-strong-black pt-3 px-9'
                            : 'border-top-strong-black bg-white pt-2 h-full whitespace-nowrap text-ellipsis overflow-hidden'
                    "
                    v-if="!isMileStone || enableInput"
                >
                    <v-text-field
                        v-if="enableInput"
                        label="Order No."
                        variant="underlined"
                        type="number"
                        clearable
                        ref="textField"
                        :model-value="formData.order_no"
                        @update:model-value="
                            (newValue) => handleUpdate('order_no', newValue)
                        "
                        :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
                        v-if="enableInput"
                        label="Title"
                        variant="underlined"
                        type="input"
                        clearable
                        ref="textField"
                        :model-value="formData.title"
                        @update:model-value="
                            (newValue) => handleUpdate('title', newValue)
                        "
                        :rules="[rules.required]"
                    ></v-text-field>
                    <v-autocomplete
                        label="Lessons"
                        :items="items"
                        item-title="name"
                        :model-value="formData.lessons"
                        multiple
                        v-if="enableInput && !isMileStone"
                        @update:modelValue="
                            (newValue) => handleUpdate('lessons', newValue)
                        "
                        chips
                        clearable
                        closable-chips
                    ></v-autocomplete>
                    <div
                        class="block whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                        <span v-if="!enableInput" class="text-2xl"
                            >{{ formData.content }}
                            <v-tooltip activator="parent" location="bottom">{{
                                formData.content
                            }}</v-tooltip>
                        </span>
                        <div>
                            <v-list
                                :items="formData.lessons"
                                v-if="!isMileStone && !enableInput"
                            ></v-list>
                        </div>
                        <v-textarea
                            v-if="enableInput && !isMileStone"
                            label="Content"
                            :model-value="formData.content"
                            class="h-full"
                            ref="textAreaField"
                            @update:model-value="
                                (newValue) => handleUpdate('content', newValue)
                            "
                        ></v-textarea>
                    </div>
                </v-card-text>
                <v-card-actions v-if="enableInput" class="bg-white">
                    <v-btn
                        color="green"
                        text="Save"
                        variant="elevated"
                        @click="submitForm"
                        :disabled="!formIsValid"
                    ></v-btn>

                    <v-btn
                        color="red"
                        text="Cancel"
                        variant="elevated"
                        @click="cancelEditing"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<style></style>
