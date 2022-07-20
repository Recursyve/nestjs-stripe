import { Stripe } from "stripe";

export class StripeSetupIntentsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly setupIntent: Stripe.SetupIntent
    ) {}
}
