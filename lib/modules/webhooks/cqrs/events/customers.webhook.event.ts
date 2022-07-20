import { Stripe } from "stripe";

export class StripeCustomersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly customer: Stripe.Customer
    ) {}
}

export class StripeCustomerDiscountsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly discount: Stripe.Discount
    ) {}
}

export class StripeCustomerSourcesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly source: Stripe.Source
    ) {}
}

export class StripeCustomerSubscriptionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly subscription: Stripe.Subscription
    ) {}
}

export class StripeCustomerTaxIdWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly taxId: Stripe.TaxId
    ) {}
}
