export interface BillingWidgetResource {
  is_active: boolean;
  reason: string;
  metadata: {
    actual_message_count: number;
    plan_message_count: number;
  };
}
