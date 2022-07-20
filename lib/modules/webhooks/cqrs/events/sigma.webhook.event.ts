import { Stripe } from "stripe";

export class StripeSigmaScheduledQueryRunWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly scheduledQueryRun: Stripe.Sigma.ScheduledQueryRun
    ) {}
}
