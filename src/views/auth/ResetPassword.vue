<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { ref, watch } from "vue";
import rules from "@/utils/rules";
import authResource from "@/resource/auth/auth.resource";
import { getTextErrorMessage } from "@/utils/errors";
import { useRoute, useRouter } from "vue-router";

pageTitle.value = "Reset Password";

const route = useRoute();
const router = useRouter();

const password = ref<string>("");
const passwordShow = ref<boolean>(false);

const valid = ref(false);
const loading = ref(false);

const errors = ref<string[]>([]);

function submit() {
  if (valid.value) {
    loading.value = true;
    authResource
      .passwordReset(password.value, route.params.token as string)
      .subscribe({
        next: () => {
          loading.value = false;
          router.push({ name: "signIn" });
        },
        error: (error) => {
          loading.value = false;
          errors.value = getTextErrorMessage(error.response.data);
        },
      });
  }
}
watch(password, () => {
  errors.value = [];
});
</script>
<template lang="pug">
VForm(ref="form", v-model="valid", @submit.prevent="submit")
  VCard.mx-auto(width="600px", max-width="100%", :loading="loading")
    VCardTitle Update password
    VCardText
      VTextField(
        v-model="password",
        :type="passwordShow ? 'text' : 'password'",
        :append-icon="passwordShow ? '$eye' : '$eyeOff'",
        label="New password",
        :rules="[rules.required]",
        autocomplete="new-password",
        @click:append="passwordShow = !passwordShow"
      )
      VAlert.mt-2(
        v-for="error in errors",
        :key="error",
        density="compact",
        type="error",
        :text="error",
        closable
      )

      .text-center.mt-3
        v-btn(:disabled="!valid || loading", color="primary", @click="submit") Update password
</template>
<style></style>
