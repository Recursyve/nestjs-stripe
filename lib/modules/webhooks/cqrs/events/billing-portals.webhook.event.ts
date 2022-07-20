import { Stripe } from "stripe";

export class StripeBillingPortalConfigurationsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly configuration: Stripe.BillingPortal.Configuration
    ) {}
}

export class StripeBillingPortalSessionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly session: Stripe.BillingPortal.Session
    ) {}
}
