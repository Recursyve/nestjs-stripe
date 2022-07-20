import { Stripe } from "stripe";

export class StripeCreditNotesWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly creditNote: Stripe.CreditNote
    ) {}
}
