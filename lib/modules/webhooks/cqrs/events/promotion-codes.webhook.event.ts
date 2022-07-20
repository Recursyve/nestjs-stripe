import { Stripe } from "stripe";

export class StripePromotionCodesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly promotionCode: Stripe.PromotionCode
    ) {}
}
