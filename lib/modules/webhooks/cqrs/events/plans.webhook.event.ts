import { Stripe } from "stripe";

export class StripePlansWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly plan: Stripe.Plan
    ) {}
}
