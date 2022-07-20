import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripeWebhooksGuard } from "../guards/stripe-webhooks.guard";
import { StripeEventPipe } from "../pipes/stripe-event.pipe";
import { StripeWebhookHandlerService } from "../services/stripe-webhook-handler.service";

@Controller("stripe/webhook")
@UseGuards(StripeWebhooksGuard)
export class StripeWebhooksController {
    constructor(private service: StripeWebhookHandlerService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async handleEvent(@Body(new StripeEventPipe()) event: Stripe.Event): Promise<void> {
        return this.service.handleEvent(event);
    }
}
