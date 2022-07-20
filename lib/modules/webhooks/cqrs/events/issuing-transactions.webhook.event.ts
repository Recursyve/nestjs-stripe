import { Stripe } from "stripe";

export class StripeIssuingTransactionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly transaction: Stripe.Issuing.Transaction
    ) {}
}
