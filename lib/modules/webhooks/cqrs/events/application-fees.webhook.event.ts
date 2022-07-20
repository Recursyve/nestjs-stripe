import { Stripe } from "stripe";

export class StripeApplicationFeesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly applicationFee: Stripe.ApplicationFee
    ) {}
}
