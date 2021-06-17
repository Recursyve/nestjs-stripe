import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export abstract class StripeWebhookHandlerService {
    public abstract invoicePaymentSuccess(event: Stripe.Invoice): Promise<void>;
    public abstract invoicePaymentFailure(event: Stripe.Invoice): Promise<void>;
}
