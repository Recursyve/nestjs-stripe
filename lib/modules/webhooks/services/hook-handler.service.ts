import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export abstract class HookHandlerService {
    public abstract invoicePaymentSuccess(event: Stripe.Event): Promise<void>;
    public abstract invoicePaymentFailure(event: Stripe.Event): Promise<void>;
}
