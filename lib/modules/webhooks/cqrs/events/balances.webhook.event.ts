import { Stripe } from "stripe";

export class StripeBalancesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly balance: Stripe.Balance
    ) {}
}
