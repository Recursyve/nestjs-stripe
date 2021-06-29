import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export abstract class StripeWebhookHandlerService {
    public abstract invoicePaymentSuccess(event: Stripe.Invoice): Promise<void>;
    public abstract invoicePaymentFailure(event: Stripe.Invoice): Promise<void>;
    public abstract invoiceCreation(event: Stripe.Invoice): Promise<void>;
    public abstract paymentIntentSuccess(event: Stripe.PaymentIntent): Promise<void>;
    public abstract paymentIntentFailure(event: Stripe.PaymentIntent): Promise<void>;
}
