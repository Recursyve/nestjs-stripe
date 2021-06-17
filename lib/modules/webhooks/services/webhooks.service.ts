import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeWebhooksService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public constructEvent(payload: string | Buffer, header: string | Buffer | string[], secret: string): Stripe.Event {
        return this.stripe.webhooks.constructEvent(payload, header, secret);
    }
}
