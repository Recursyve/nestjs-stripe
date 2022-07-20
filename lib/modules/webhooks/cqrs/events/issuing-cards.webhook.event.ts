import { Stripe } from "stripe";

export class StripeIssuingCardsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly card: Stripe.Issuing.Card
    ) {}
}
