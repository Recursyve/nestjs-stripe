import { Stripe } from "stripe";

export class StripeQuotesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly quote: Stripe.Quote
    ) {}
}
