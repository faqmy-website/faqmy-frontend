import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Observable, tap } from "rxjs";
import type { BillingWidgetResource } from "@/resource/billing/billing";
import billingResource from "@/resource/billing/billing.resource";

export const useBillingStore = defineStore("billing", () => {
  const billing = ref<BillingWidgetResource | null>(null);

  function initBilling(sid: string): Observable<BillingWidgetResource> {
    return billingResource.billing(sid).pipe(
      tap((data) => {
        billing.value = data;
      })
    );
  }

  const isBlockedChat = computed<boolean>(() => {
    return (
      !!billing.value &&
      (billing.value.metadata.actual_message_count >=
        billing.value.metadata.plan_message_count ||
        !billing.value.is_active)
    );
  });

  function $reset() {
    billing.value = null;
  }

  return {
    billing,
    isBlockedChat,
    initBilling,
    $reset,
  };
});
