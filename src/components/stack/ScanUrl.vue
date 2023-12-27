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

const url = ref<string>("");
const valid = ref(false);
const loading = ref(false);
const errors = ref<string[]>([]);

function submit() {
  if (!props.isCreateNewLearnedCard) {
    emit("planBlocked");
    return;
  }
  if (valid.value) {
    loading.value = true;
    cardResource.scanUrl(props.sid, url.value).subscribe({
      next: () => {
        loading.value = false;
        errors.value = [];
      },
      error: (error) => {
        loading.value = false;
        errors.value = getTextErrorMessage(error.response.data);
      },
    });
  }
}

watch(url, () => {
  errors.value = [];
});
</script>
<template lang="pug">
VForm(v-model="valid", :disabled="loading", @submit.prevent="submit")
  VTextField(
    v-model="url",
    label="Website URL",
    placeholder="Enter a website URL to scan",
    :rules="[rules.required, rules.link]"
  )
  VAlert.my-2(
    v-for="error in errors",
    :key="error",
    density="compact",
    type="error",
    :text="error",
    closable
  )
  VBtn.mt-2(:disabled="!valid", :loading="loading", @click="submit") Scan
</template>

<style scoped></style>
