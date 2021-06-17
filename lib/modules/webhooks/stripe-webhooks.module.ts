import { Module } from "@nestjs/common";
import {StripeWebhooksController} from "./controllers/stripe-webhooks.controller";
import {StripeWebhooksService} from "./services/stripe-webhooks.service";
import {StripeWebhookHandlerService} from "./services/stripe-webhook-handler.service";


@Module({
    controllers: [StripeWebhooksController],
    providers: [StripeWebhooksService],
    exports: [StripeWebhooksService, StripeWebhookHandlerService]
})
export class StripeWebHooksModule {}
