import { Stripe } from "stripe";

export class StripeRecipientsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly recipient: Stripe.Recipient
    ) {}
}
