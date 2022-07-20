import { Stripe } from "stripe";

export class StripeMandatesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly mandate: Stripe.Mandate
    ) {}
}
