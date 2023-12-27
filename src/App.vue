<script lang="ts" setup>
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { onMounted } from "vue";
import { useBillingStore } from "@/store/billing.store";

const userStore = useUserStore();
const authStore = useAuthStore();
const billingStore = useBillingStore();

onMounted(() => {
  if (authStore.isAuth) {
    userStore.fetchUser().subscribe();
    billingStore.fetchBilling().subscribe();
  }
});
</script>

<template lang="pug">
RouterView
</template>
