<script lang="ts" setup>
import { ref, watch } from "vue";
import rules from "@/utils/rules";
import cardResource from "@/resource/card/card.resource";
import { getTextErrorMessage } from "@/utils/errors";

const props = defineProps<{
  sid: string;
  isCreateNewLearnedCard?: boolean;
}>();

const emit = defineEmits<{
  (e: "planBlocked"): void;
}>();

const files = ref<File[]>([]);
const valid = ref(false);
const loading = ref(false);
const errors = ref<string[]>([]);

function submit() {
  if (!props.isCreateNewLearnedCard) {
    emit("planBlocked");
    return;
  }
  if (valid.value && files.value[0]) {
    loading.value = true;
    cardResource.scanFile(props.sid, files.value[0]).subscribe({
      next: () => {
        loading.value = false;
        errors.value = [];
        files.value = [];
      },
      error: (error) => {
        loading.value = false;
        errors.value = getTextErrorMessage(error.response.data);
      },
    });
  }
}

watch(files, () => {
  errors.value = [];
});
</script>
<template lang="pug">
VForm(v-model="valid", :disabled="loading", @submit.prevent="submit")
  VFileInput(
    v-model="files",
    :rules="[rules.required, rules.maxSize10MB]",
    accept=".pdf, .docx, .txt",
    label="File input"
  )
  VAlert.my-2(
    v-for="error in errors",
    :key="error",
    density="compact",
    type="error",
    :text="error",
    closable
  )
  VBtn.mt-2(
    :disabled="!valid || !files[0]",
    :loading="loading",
    @click="submit"
  ) Upload
</template>

<style scoped></style>
