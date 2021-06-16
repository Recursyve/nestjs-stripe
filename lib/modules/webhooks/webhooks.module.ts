import { Module } from "@nestjs/common";
import { StripeWebHooksService } from "./services/webhooks.service";
import { WebhooksController } from "./controllers/webhooks.controller";

@Module({
    controllers: [WebhooksController],
    providers: [StripeWebHooksService],
    exports: [StripeWebHooksService]
})
export class StripeWebHooksModule {}
