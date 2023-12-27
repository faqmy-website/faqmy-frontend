export interface BillingConstantsResource {
  customer_portal_url: string;
  pricing_table_id: string;
  publishable_key: string;
}

export interface BillingSubscriptionResource {
  created: number;
  current_period_end: number;
  current_period_start: number;
  id: string;
  plan_amount: number;
  plan_id: string;
  plan_interval: string;
  plan_interval_count: number;
  plan_product: string;
  start_date: number;
  status: string;
  trial_end: number;
  trial_start: number;
}
export interface BillingProductResource {
  active: boolean;
  attributes: [];
  created: number;
  default_price: string;
  description: null;
  id: string;
  images: [];
  livemode: boolean;
  metadata: {
    cards_count: string;
    stacks_count: string;
    messages_count: string;
  };
  name: string;
  object: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: string;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export interface BillingCurrentPlan {
  name: string;
  trialEnd: number | null;
  planInterval: string;
  currentPeriodEnd: number;
  planPrice: number;
  planCardsCount: number;
  planStacksCount: number;
  planMessagesCount: number;
}
