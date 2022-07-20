import { Stripe } from "stripe";

export class StripeReviewsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly review: Stripe.Review
    ) {}
}
