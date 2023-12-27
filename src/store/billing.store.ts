import { defineStore } from "pinia";
import { ref } from "vue";
import { map, Observable, tap, zip } from "rxjs";
import billingResource from "@/resource/billing/billing.resource";
import type {
  BillingConstantsResource,
  BillingCurrentPlan,
} from "@/resource/billing/billing";

export const useBillingStore = defineStore("billing", () => {
  const constants = ref<BillingConstantsResource | null>(null);
  const currentPlan = ref<BillingCurrentPlan | null>(null);

  function fetchBilling(): Observable<BillingCurrentPlan | null> {
    return zip(
      billingResource.subscriptions(),
      billingResource.products()
    ).pipe(
      map(([subscriptions, products]) => {
        if (!subscriptions.length) return null;
        const subscription = subscriptions[0];
        const product = products.find(
          (item) => item.id === subscription.plan_product
        );
        if (!product) return null;
        currentPlan.value = {
          name: product.name,
          trialEnd: subscription.trial_end
            ? subscription.trial_end * 1000
            : null,
          planInterval: subscription.plan_interval,
          currentPeriodEnd: subscription.current_period_end * 1000,
          planMessagesCount: Number(product.metadata.messages_count),
          planCardsCount: Number(product.metadata.cards_count),
          planStacksCount: Number(product.metadata.stacks_count),
          planPrice: subscription.plan_amount,
        };
        return currentPlan.value;
      }),
      tap(() => {
        billingResource.constants().subscribe((dataConst) => {
          constants.value = dataConst;
        });
      })
    );
  }

  function $reset() {
    currentPlan.value = null;
  }

  return {
    currentPlan,
    constants,
    fetchBilling,
    $reset,
  };
});
