import { Stripe } from "stripe";

export class StripeFinancialConnectionAccountsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly account: Stripe.FinancialConnections.Account
    ) {}
}
