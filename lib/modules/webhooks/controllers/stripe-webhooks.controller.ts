import {Body, Controller, HttpCode, HttpStatus, Optional, Post, UseGuards} from "@nestjs/common";
import { StripeWebhookHandlerService } from "../services/stripe-webhook-handler.service";
import { Stripe } from "stripe";
import { StripeEventPipe } from "../pipes/stripe-event.pipe";
import {StripeWebhooksGuard} from "../../../guards/stripe-webhooks.guard";

export enum StripeWebhookRoutePaths {
    PaymentIntentFailure = "payment-intent/failure",
    PaymentIntentSuccess = "payment-intent/success",
    InvoiceCreation = "invoice/creation",
    InvoiceSuccess = "invoice/success",
    InvoiceFailure = "invoice/failure"
}

@Controller("stripe/webhooks")
@UseGuards(StripeWebhooksGuard)
export class StripeWebhooksController {
    constructor(@Optional() private service: StripeWebhookHandlerService) {
    }

    @Post(StripeWebhookRoutePaths.InvoiceCreation)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoiceCreation(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service?.invoiceCreation(invoice);
    }

    @Post(StripeWebhookRoutePaths.InvoiceSuccess)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentSuccess(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service?.invoicePaymentSuccess(invoice);
    }

    @Post(StripeWebhookRoutePaths.InvoiceFailure)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentFailure(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service?.invoicePaymentFailure(invoice);
    }

    @Post(StripeWebhookRoutePaths.PaymentIntentSuccess)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onPaymentIntentSuccess(@Body(new StripeEventPipe<Stripe.PaymentIntent>()) intent: Stripe.PaymentIntent): Promise<void> {
        return this.service?.paymentIntentSuccess(intent);
    }

    @Post(StripeWebhookRoutePaths.PaymentIntentFailure)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onPaymentIntentFailure(@Body(new StripeEventPipe<Stripe.PaymentIntent>()) intent: Stripe.PaymentIntent): Promise<void> {
        return this.service?.paymentIntentFailure(intent);
    }
}

