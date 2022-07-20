import { Stripe } from "stripe";

export class StripeIssuingAuthorizationsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly authorization: Stripe.Issuing.Authorization
    ) {}
}
