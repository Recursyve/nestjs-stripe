import { Module } from "@nestjs/common";
import { StripeWebHooksService } from "./services/webhooks.service";
import { WebhooksController } from "./controllers/webhooks.controller";
import { HookHandlerService } from "./services/hook-handler.service";

@Module({
    controllers: [WebhooksController],
    providers: [StripeWebHooksService],
    exports: [StripeWebHooksService, HookHandlerService]
})
export class StripeWebHooksModule {}
