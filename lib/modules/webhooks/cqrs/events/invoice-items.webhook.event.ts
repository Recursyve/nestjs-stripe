import { Stripe } from "stripe";

export class StripeInvoiceItemsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly item: Stripe.InvoiceItem
    ) {}
}
