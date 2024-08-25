<script setup>
import { ref } from 'vue';
const props = defineProps(['dialogVisible', 'infoDetail', 'isMileStone']);
const items = [
    { id: 1, name: 'California' },
    { id: 2, name: 'Colorado' },
    { id: 3, name: 'Florida' },
    { id: 4, name: 'Georgia' },
    { id: 5, name: 'Texas' },
    { id: 6, name: 'Wyoming' },
];
const formData = ref({
    order_no: props.infoDetail.order_no ? props.infoDetail.order_no : '',
    lessons: props.infoDetail.lessons ? props.infoDetail.lessons : '',
    title: props.infoDetail.title ? props.infoDetail.title : '',
    content: props.infoDetail.content ? props.infoDetail.content : '',
});
const formIsValid = ref(false);
const emit = defineEmits(['closeDialog', 'updateData']);
const enableInput = ref(false);
const rules = ref({
    required: (value) => !!value || 'Required.',
    validURL: (value) => isValidUrl(value) || 'Invalid URL.',
});
function isValidUrl(urlString) {
    if (urlString === '') return true;
    var urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
}

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
</script>

<template>
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
                :color="!isMileStone ? (enableInput ? '' : 'yellow') : ''"
            >
                <template v-slot:title>
                    <div class="flex flex-row" v-if="!enableInput">
                        <div
                            class="basis-4/6 whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                            <div
                                v-if="!enableInput"
                                class="mt-2 whitespace-nowrap text-ellipsis overflow-hidden"
                            >
                                <span class="text-3xl"
                                    >{{
                                        infoDetail.order_no +
                                        '. ' +
                                        infoDetail.title
                                    }}<v-tooltip
                                        activator="parent"
                                        location="bottom"
                                        >{{
                                            infoDetail.order_no +
                                            '. ' +
                                            infoDetail.title
                                        }}</v-tooltip
                                    ></span
                                >
                            </div>
                        </div>
                        <div class="basis-1/6">
                            <!-- <v-btn
                                v-if="
                                    !enableInput &&
                                    infoDetail.link &&
                                    infoDetail.link !== ''
                                "
                                icon="mdi-open-in-new"
                                variant="text"
                                :href="infoDetail.link"
                                target="_blank"
                            ></v-btn> -->
                        </div>
                        <div class="basis-1/6">
                            <v-btn
                                v-if="!enableInput"
                                icon="mdi-pencil"
                                variant="text"
                                @click="enableInput = true"
                            ></v-btn>
                        </div>
                    </div>
                    <div v-else class="flex flex-row">
                        <div class="pl-5">
                            <div class="mt-2">
                                <span class="text-3xl text-wrap break-words"
                                    >Modify: {{ formData.title }}</span
                                >
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
                            >{{ infoDetail.content }}
                            <v-tooltip activator="parent" location="bottom">{{
                                infoDetail.content
                            }}</v-tooltip>
                        </span>
                        <div>
                            <v-list
                                :items="infoDetail.lessons"
                                v-if="!isMileStone && !enableInput"
                            ></v-list>
                        </div>
                        <v-textarea
                            v-if="enableInput"
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
                        @click="enableInput = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<style></style>
