import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export abstract class StripeWebhookHandlerService {
    public abstract handleEvent(event: Stripe.Event): Promise<void>;
}
