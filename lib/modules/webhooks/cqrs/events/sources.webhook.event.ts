import { Stripe } from "stripe";

export class StripeSourcesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly source: Stripe.Source
    ) {}
}

export class StripeSourceMandateNotificationsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly notification: Stripe.SourceMandateNotification
    ) {}
}

export class StripeSourceTransactionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly transaction: Stripe.SourceTransaction
    ) {}
}
