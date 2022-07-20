import { Stripe } from "stripe";

export class StripeTransfersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly transfer: Stripe.Transfer
    ) {}
}
