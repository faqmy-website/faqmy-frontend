<script lang="ts" setup>
import { onMounted } from "vue";
import pageTitle from "@/utils/title";
import { useUserStore } from "@/store/user.store";
import { useBillingStore } from "@/store/billing.store";
import CurrentPlan from "@/components/billing/CurrentPlan.vue";

//import StripePricingTable from "@/components/StripePricingTable.vue";
// Import the Stripe script.
// Import the component at the beginning of your <script> tag.
// Register the component in your `export default` object.
// import authResource from "@/resource/auth/auth.resource";

pageTitle.value = "Billing Page";

const userStore = useUserStore();
const billingStore = useBillingStore();

onMounted(() => {
  const scripts = ["https://js.stripe.com/v3/pricing-table.js"];
  scripts.forEach((script) => {
    let tag = document.head.querySelector(`[src="${script}"`);
    if (!tag) {
      tag = document.createElement("script");
      tag.setAttribute("src", script);
      tag.setAttribute("type", "text/javascript");
      document.head.appendChild(tag);
    }
  });
});
</script>

<template lang="pug">
div(v-if="billingStore.currentPlan")
  CurrentPlan
div(v-else)
  div(v-if="billingStore.constants && userStore.info")
    //stripe-pricing-table(
    //  pricing-table-id="prctbl_1NE5aTKcxpjlxVafZzUKlACO",
    //  publishable-key="pk_live_51Mi6LGKcxpjlxVafhnm3INw7ygP71ELjDj044UGNCUTODMEhOmI4pnpY7sJuYaerBISvCI2mYxUoc8FfzoPWkefi004WUiD1JD"
    //)
    // test
    stripe-pricing-table(
      :pricing-table-id="billingStore.constants?.pricing_table_id",
      :publishable-key="billingStore.constants?.publishable_key",
      :customer-email="userStore.info?.email",
      :client-reference-id="userStore.info?.id"
    )
</template>

<style scoped>
/* Your scoped styles here */
</style>
