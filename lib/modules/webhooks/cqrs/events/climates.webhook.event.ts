import { Stripe } from "stripe";

export class StripeClimateOrdersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly order: Stripe.Climate.Order
    ) {}
}

export class StripeClimateProductsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly order: Stripe.Climate.Product
    ) {}
}
