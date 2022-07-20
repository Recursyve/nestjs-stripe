import { Stripe } from "stripe";

export class StripeChargesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly charge: Stripe.Charge
    ) {}
}

export class StripeChargeDisputesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly dispute: Stripe.Dispute
    ) {}
}

export class StripeChargeRefundsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly refund: Stripe.Refund
    ) {}
}
