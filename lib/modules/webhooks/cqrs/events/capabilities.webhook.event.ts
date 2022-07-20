import { Stripe } from "stripe";

export class StripeCapabilitiesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly capability: Stripe.Capability
    ) {}
}
