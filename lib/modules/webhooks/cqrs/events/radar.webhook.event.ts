import { Stripe } from "stripe";

export class StripeRadarEarlyFraudWarningWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly earlyFraudWarning: Stripe.Radar.EarlyFraudWarning
    ) {}
}
