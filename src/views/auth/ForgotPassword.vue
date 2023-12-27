<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { ref, watch } from "vue";
import rules from "@/utils/rules";
import authResource from "@/resource/auth/auth.resource";
import { getTextErrorMessage } from "@/utils/errors";

pageTitle.value = "Forgot Password";

const email = ref<string>("");

const valid = ref(false);
const loading = ref(false);

const success = ref(false);
const successEmail = ref("");

const errors = ref<string[]>([]);

function submit() {
  if (valid.value) {
    loading.value = true;
    authResource.passwordForgot(email.value).subscribe({
      next: () => {
        loading.value = false;
        success.value = true;
        successEmail.value = email.value;
      },
      error: (error) => {
        loading.value = false;
        errors.value = getTextErrorMessage(error.response.data);
      },
    });
  }
}
watch(email, () => {
  errors.value = [];
});
</script>
<template lang="pug">
VForm(ref="form", v-model="valid", @submit.prevent="submit")
  VCard.mx-auto(width="600px", max-width="100%", :loading="loading")
    VCardTitle Password reset
    VCardText
      .text-body-2.pb-3 Enter the email you used to create your FaqMy account. We'll send you an email with instructions.
      VTextField(
        v-model="email",
        :rules="[rules.required, rules.email]",
        label="E-mail",
        required,
        :disabled="loading"
      )
      VAlert.mt-2(
        v-for="error in errors",
        :key="error",
        density="compact",
        type="error",
        :text="error",
        closable
      )
      VAlert(v-if="success", dense, type="success")
        .title Check your email
        div We've sent an email with instructions for the password reset to {{ successEmail }}. Please check your email now and don't forget to check the spam folder.

      .text-center.mt-3
        v-btn(:disabled="!valid || loading", color="primary", @click="submit") Reset
</template>
<style></style>
