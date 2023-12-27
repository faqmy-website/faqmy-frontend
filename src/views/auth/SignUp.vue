<script lang="ts" setup>
import { ref, watch } from "vue";
import rules from "@/utils/rules";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "vue-router";
import pageTitle from "@/utils/title";
import { getTextErrorMessage } from "@/utils/errors";
import { useBillingStore } from "@/store/billing.store";

pageTitle.value = "Sign Up";

const authStore = useAuthStore();
const billingStore = useBillingStore();

const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");

const valid = ref(false);
const passwordShow = ref<boolean>(false);

const loading = ref(false);
const errors = ref<string[]>([]);
function submit() {
  if (valid.value) {
    loading.value = true;
    authStore.signUp(email.value, password.value).subscribe({
      next: () => {
        loading.value = false;
        errors.value = [];

        if (billingStore.currentPlan) {
          router.push({ name: "designer" });
        } else {
          router.push({ name: "billing" });
        }
      },
      error: (error) => {
        loading.value = false;
        errors.value = getTextErrorMessage(error.response?.data);
      },
    });
  }
}

watch([email, password], () => {
  errors.value = [];
});
</script>

<template lang="pug">
VCard.mx-auto(
  width="600px",
  max-width="100%",
  title="Sign Up",
  :loading="loading"
)
  VCardText
    VForm(v-model="valid", @submit.prevent="submit")
      VTextField(
        v-model="email",
        type="email",
        label="Email",
        placeholder="johndoe@gmail.com",
        autocomplete="username",
        :rules="[rules.required, rules.email]"
      )
      VTextField(
        v-model="password",
        :type="passwordShow ? 'text' : 'password'",
        :append-icon="passwordShow ? '$eye' : '$eyeOff'",
        label="Password",
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
      .mt-2.text-center
        VBtn(
          variant="flat",
          color="primary",
          size="large",
          :disabled="!valid || loading",
          @click="submit"
        ) Sign Up

    .text-center.mt-6
      RouterLink(:to="{ name: 'signIn' }") Already have an account? Sign in
</template>

<style scoped></style>
