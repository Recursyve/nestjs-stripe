import { Stripe } from "stripe";

export class StripeSubscriptionSchedulesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly schedule: Stripe.SubscriptionSchedule
    ) {}
}
