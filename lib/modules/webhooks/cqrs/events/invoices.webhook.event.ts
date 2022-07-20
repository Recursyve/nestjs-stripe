import { Stripe } from "stripe";

export class StripeInvoicesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly invoice: Stripe.Invoice
    ) {}
}
