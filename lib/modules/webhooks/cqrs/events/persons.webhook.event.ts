import { Stripe } from "stripe";

export class StripePersonsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly person: Stripe.Person
    ) {}
}
