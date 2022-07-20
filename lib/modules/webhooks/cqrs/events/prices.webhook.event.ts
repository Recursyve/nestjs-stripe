import { Stripe } from "stripe";

export class StripePricesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly price: Stripe.Price
    ) {}
}
