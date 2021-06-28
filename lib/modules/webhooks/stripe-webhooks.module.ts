import { Module } from "@nestjs/common";
import { StripeWebhooksController } from "./controllers/stripe-webhooks.controller";
import { StripeWebhooksService } from "./services/stripe-webhooks.service";
import { StripeConfigService } from "../config/services/stripe-config.service";


@Module({
    controllers: [StripeWebhooksController],
    providers: [
        StripeWebhooksService,
        StripeConfigService
    ],
    exports: [StripeWebhooksService]
})
export class StripeWebHooksModule {}
