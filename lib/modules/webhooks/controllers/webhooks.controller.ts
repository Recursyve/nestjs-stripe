import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HookHandlerService } from "../services/hook-handler.service";
import { Stripe } from "stripe";
import {StripeEventPipe} from "../pipes/stripe-event.pipe";
import {ValidateStripeEvent} from "../../../decorators/validate-stripe-event";

@Controller("stripe/webhooks")
export class WebhooksController {

    constructor(private service: HookHandlerService) {
    }

    @Post("invoice/success")
    @ValidateStripeEvent()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentSuccess(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service.invoicePaymentSuccess(invoice);
    }

    @Post("invoice/failure")
    @ValidateStripeEvent()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentFailure(@Body(new StripeEventPipe<Stripe.Invoice>()) invoice: Stripe.Invoice): Promise<void> {
        return this.service.invoicePaymentFailure(invoice);
    }
}
