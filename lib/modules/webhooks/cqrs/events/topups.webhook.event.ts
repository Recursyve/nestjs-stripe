import { Stripe } from "stripe";

export class StripeTopupsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly topup: Stripe.Topup
    ) {}
}
