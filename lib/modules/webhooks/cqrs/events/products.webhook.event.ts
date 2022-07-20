import { Stripe } from "stripe";

export class StripeProductsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly product: Stripe.Product
    ) {}
}
