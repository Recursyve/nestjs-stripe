import { Module } from "@nestjs/common";
import {StripeWebhooksController} from "./controllers/stripe-webhooks.controller";
import {StripeWebhooksService} from "./services/stripe-webhooks.service";


@Module({
    controllers: [StripeWebhooksController],
    providers: [StripeWebhooksService],
    exports: [StripeWebhooksService]
})
export class StripeWebHooksModule {}
