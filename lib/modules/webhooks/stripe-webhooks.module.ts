import { Module } from "@nestjs/common";
import { StripeWebhooksController } from "./controllers/stripe-webhooks.controller";
import { StripeWebhooksService } from "./services/stripe-webhooks.service";
import { StripeWebhooksGuard } from "../../guards/stripe-webhooks.guard";
import { APP_GUARD } from "@nestjs/core";
import { StripeConfigService } from "../config/services/stripe-config.service";


@Module({
    controllers: [StripeWebhooksController],
    providers: [
        StripeWebhooksService,
        StripeConfigService,
        {
            provide: APP_GUARD,
            useClass: StripeWebhooksGuard
        }
    ],
    exports: [StripeWebhooksService]
})
export class StripeWebHooksModule {}
