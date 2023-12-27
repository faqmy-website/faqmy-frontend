import { map, Observable } from "rxjs";
import { fmAPI } from "@/utils/axios";
import type { BillingWidgetResource } from "@/resource/billing/billing";

const billingResource = {
  billing(sid: string): Observable<BillingWidgetResource> {
    return fmAPI
      .get<BillingWidgetResource>(`/billing/widget/${sid}`, {})
      .pipe(map((data) => data.data));
  },
};

export default billingResource;
