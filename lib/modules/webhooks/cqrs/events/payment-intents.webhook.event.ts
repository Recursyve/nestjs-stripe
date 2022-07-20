import { Stripe } from "stripe";

export class StripePaymentIntentsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly paymentIntent: Stripe.PaymentIntent
    ) {}
}
