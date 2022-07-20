import { Stripe } from "stripe";

export class StripeSkuWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly sku: Stripe.Sku
    ) {}
}
