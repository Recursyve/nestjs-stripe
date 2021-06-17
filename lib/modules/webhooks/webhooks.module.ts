import { Module } from "@nestjs/common";
import {StripeWebhooksController} from "./controllers/webhooks.controller";
import {StripeWebhooksService} from "./services/webhooks.service";
import {StripeWebhookHandlerService} from "./services/hook-handler.service";


@Module({
    controllers: [StripeWebhooksController],
    providers: [StripeWebhooksService],
    exports: [StripeWebhooksService, StripeWebhookHandlerService]
})
export class StripeWebHooksModule {}
