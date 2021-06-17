import {Body, Controller, HttpCode, HttpStatus, Optional, Post} from "@nestjs/common";
import { StripeWebhookHandlerService } from "../services/stripe-webhook-handler.service";
import { Stripe } from "stripe";
import { StripeEventPipe } from "../pipes/stripe-event.pipe";
import { ValidateStripeEvent } from "../../../decorators/validate-stripe-event";

@Controller("stripe/webhooks")
export class StripeWebhooksController {
    constructor(@Optional() private service: StripeWebhookHandlerService) {
    }

    @Post("invoice/success")
    @ValidateStripeEvent()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentSuccess(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service?.invoicePaymentSuccess(invoice);
    }

    @Post("invoice/failure")
    @ValidateStripeEvent()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentFailure(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service?.invoicePaymentFailure(invoice);
    }
}
