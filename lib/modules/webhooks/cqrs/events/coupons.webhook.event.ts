import { Stripe } from "stripe";

export class StripeCouponsWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly coupon: Stripe.Coupon
    ) {}
}
