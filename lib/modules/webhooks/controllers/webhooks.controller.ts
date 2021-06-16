import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { PublicRoute } from "nestjs-jwt2";
import { HookHandlerService } from "../services/hook-handler.service";
import { Stripe } from "stripe";
import { HooksGuard } from "../../../guards/hooks.guard";

@Controller("webhooks")
export class WebhooksController {
    constructor(private service: HookHandlerService) {
    }

    @Post("invoice-success")
    @PublicRoute()
    @UseGuards(HooksGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentSuccess(@Body() event: Stripe.Event): Promise<void> {
        return this.service.invoicePaymentSuccess(event);
    }

    @Post("invoice-failure")
    @PublicRoute()
    @UseGuards(HooksGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async onInvoicePaymentFailure(@Body() event: Stripe.Event): Promise<void> {
        return this.service.invoicePaymentFailure(event);
    }
}
