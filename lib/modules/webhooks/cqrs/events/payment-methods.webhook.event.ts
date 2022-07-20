import { Stripe } from "stripe";

export class StripePaymentMethodsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly paymentMethod: Stripe.PaymentMethod
    ) {}
}
