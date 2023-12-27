import { map, Observable } from "rxjs";
import { fmAPI } from "@/utils/axios";
import type {
  BillingConstantsResource,
  BillingSubscriptionResource,
  BillingProductResource,
} from "@/resource/billing/billing";

const billingResource = {
  products(): Observable<BillingProductResource[]> {
    return fmAPI
      .get<{
        data: BillingProductResource[];
      }>("/billing/products", {})
      .pipe(map((data) => data.data.data));
  },
  subscriptions(): Observable<BillingSubscriptionResource[]> {
    return fmAPI
      .get<BillingSubscriptionResource[]>("/billing/subscription")
      .pipe(map((data) => data.data));
  },
  constants(): Observable<BillingConstantsResource> {
    return fmAPI
      .get<BillingConstantsResource>("/billing/constants")
      .pipe(map((data) => data.data));
  },
};

export default billingResource;
