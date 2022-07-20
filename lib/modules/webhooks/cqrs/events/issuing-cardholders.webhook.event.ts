import { Stripe } from "stripe";

export class StripeIssuingCardholdersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly cardholder: Stripe.Issuing.Cardholder
    ) {}
}
