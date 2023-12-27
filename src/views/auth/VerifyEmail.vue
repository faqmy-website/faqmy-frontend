<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { onMounted, ref } from "vue";
import authResource from "@/resource/auth/auth.resource";
import { getTextErrorMessage } from "@/utils/errors";
import { useRoute, useRouter } from "vue-router";

pageTitle.value = "Verify Email";

const route = useRoute();
const router = useRouter();

const loading = ref(true);

const errors = ref<string[]>([]);

onMounted(() => {
  authResource.verifyConfirmation(route.params.token as string).subscribe({
    next() {
      loading.value = false;
      router.push("/");
    },
    error(error) {
      loading.value = false;
      errors.value = getTextErrorMessage(error.response.data);
    },
  });
});
</script>
<template lang="pug">
VCard.mx-auto(width="600px", max-width="100%", :loading="loading")
  VCardTitle Verify Email
    VAlert.mt-2(
      v-for="error in errors",
      :key="error",
      density="compact",
      type="error",
      :text="error",
      closable
    )
</template>
<style></style>
