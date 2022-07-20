import { Stripe } from "stripe";

export class StripeTestHelpersTestClockWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly testClock: Stripe.TestHelpers.TestClock
    ) {}
}
