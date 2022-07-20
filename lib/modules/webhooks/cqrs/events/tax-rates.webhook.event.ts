import { Stripe } from "stripe";

export class StripeTaxRatesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly taxRate: Stripe.TaxRate
    ) {}
}
