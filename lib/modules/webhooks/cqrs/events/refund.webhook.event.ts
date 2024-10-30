import { Stripe } from "stripe";

export class StripeRefundWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly recipient: Stripe.Refund
    ) {}
}
