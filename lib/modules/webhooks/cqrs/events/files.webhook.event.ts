import { Stripe } from "stripe";

export class StripeFilesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly file: Stripe.File
    ) {}
}
