import { Stripe } from "stripe";

export class StripeIssuingDisputesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly dispute: Stripe.Issuing.Dispute
    ) {}
}
