import { Module } from "@nestjs/common";
import { StripeWebHooksService } from "./services/webhooks.service";

@Module({
    providers: [StripeWebHooksService],
    exports: [StripeWebHooksService]
})
export class StripeWebHooksModule {}
