import { Stripe } from "stripe";

export class StripePaymentLinksWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly link: Stripe.PaymentLink
    ) {}
}
