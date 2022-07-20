import { Stripe } from "stripe";

export class StripeOrdersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly order: Stripe.Order
    ) {}
}
