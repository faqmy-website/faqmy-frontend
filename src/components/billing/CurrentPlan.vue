<script setup lang="ts">
import { useBillingStore } from "@/store/billing.store";

const billingStore = useBillingStore();
</script>

<template lang="pug">
VCard(:max-width="300")
  VCardTitle Current Plan
  VCardItem
    div {{ billingStore.currentPlan?.name }}
    .my-4(v-if="billingStore.currentPlan?.trialEnd") Trial ends {{ new Date(billingStore.currentPlan?.trialEnd).toDateString() }}
    .my-4 Billing {{ billingStore.currentPlan?.planInterval }}
    .my-4 Next invoice ${{ billingStore.currentPlan?.planPrice / 100 }} on {{ new Date(billingStore.currentPlan?.currentPeriodEnd).toDateString() }}

    div(v-if="billingStore.currentPlan")
      div This includes:
      ul.ml-2
        li * {{ billingStore.currentPlan?.planStacksCount }} chatbot
        li * {{ billingStore.currentPlan?.planMessagesCount }} messages/month
        li * {{ billingStore.currentPlan?.planCardsCount }} fact cards
    VBtn.mt-4(
      :href="billingStore.constants?.customer_portal_url",
      target="_blank"
    ) Manage subscription
</template>

<style scoped></style>
