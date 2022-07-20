import { Stripe } from "stripe";

export class StripeAccountsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly account: Stripe.Account
    ) {}
}
