<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps([
    'dialogVisible',
    'isMileStone',
    'title',
    'link',
    'content',
]);
const formIsValid = ref(false);
const { dialogVisible } = toRefs(props);
const emit = defineEmits(['closeDialog']);
const enableInput = ref(false);
const rules = ref({
    required: (value: string) => !!value || 'Required.',
    validURL: (value: string) => isValidUrl(value) || 'Invalid URL.',
});
function isValidUrl(urlString: string) {
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
    get: () => (dialogVisible ? dialogVisible.value : ''),
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
    // Form submission logic
    if (formIsValid.value) {
        console.log('Form submitted with:');
    }
};
</script>

<template>
    <v-dialog
        transition="dialog-top-transition"
        width="auto"
        class="rounded min-w-60"
        v-model="internalDialogVisible"
        @click:outside="closeDialog"
    >
        <v-form ref="form" v-model="formIsValid">
            <v-card
                class="m-auto inline-flex h-full border-strong-black min-w-60"
                :color="!isMileStone ? (enableInput ? '' : 'yellow') : ''"
            >
                <template v-slot:title>
                    <div class="flex flex-row min-w-96">
                        <div class="basis-5/6">
                            <div v-if="!enableInput" class="mt-2">
                                <span class="text-2xl">{{ title }}</span>
                            </div>
                            <v-text-field
                                v-if="enableInput"
                                label="Title"
                                variant="underlined"
                                type="input"
                                clearable
                                ref="textField"
                                :model-value="title"
                                :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                v-if="enableInput"
                                label="Link"
                                variant="underlined"
                                type="input"
                                clearable
                                ref="textField"
                                :model-value="link"
                                :rules="[rules.validURL]"
                            ></v-text-field>
                        </div>
                        <div class="basis-1/6">
                            <v-btn
                                v-if="!enableInput"
                                icon="mdi-pencil"
                                variant="text"
                                @click="enableInput = true"
                            ></v-btn>
                            <v-btn
                                v-if="!enableInput"
                                icon="mdi-open-in-new"
                                variant="text"
                                :href="link"
                                target="_blank"
                            ></v-btn>
                        </div>
                    </div>
                </template>

                <v-card-text
                    :class="
                        enableInput
                            ? 'bg-white h-full'
                            : 'border-top-strong-black bg-surface-light pt-2 h-full'
                    "
                    v-if="!isMileStone"
                >
                    <div class="block">
                        <span v-if="!enableInput" class="text-2xl">{{
                            content
                        }}</span>
                        <v-textarea
                            v-if="enableInput"
                            label="Content"
                            :model-value="content"
                            class="h-full"
                            ref="textAreaField"
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
