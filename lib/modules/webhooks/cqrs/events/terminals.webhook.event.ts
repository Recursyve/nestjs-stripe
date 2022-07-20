import { Stripe } from "stripe";

export class StripeTerminalReadersWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly reader: Stripe.Terminal.Reader
    ) {}
}
