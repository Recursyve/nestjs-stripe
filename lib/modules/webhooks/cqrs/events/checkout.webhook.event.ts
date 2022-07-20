import { Stripe } from "stripe";

export class StripeCheckoutSessionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly session: Stripe.Checkout.Session
    ) {}
}
