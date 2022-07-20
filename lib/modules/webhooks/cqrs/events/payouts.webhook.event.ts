import { Stripe } from "stripe";

export class StripePayoutsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly payout: Stripe.Payout
    ) {}
}
