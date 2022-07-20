import { Stripe } from "stripe";

export class StripeIdentityVerificationSessionsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly session: Stripe.Identity.VerificationSession
    ) {}
}
