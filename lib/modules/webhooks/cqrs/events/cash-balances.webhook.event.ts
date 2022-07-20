import { Stripe } from "stripe";

export class StripeCashBalancesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly balance: Stripe.CashBalance
    ) {}
}
