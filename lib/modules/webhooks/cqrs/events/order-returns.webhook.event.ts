import { Stripe } from "stripe";

export class StripeOrderReturnsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly order: Stripe.Order
    ) {}
}
