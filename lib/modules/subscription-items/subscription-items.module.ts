import { Module } from "@nestjs/common";
import { StripeSubscriptionItemsService } from "./services/subscription-items.service";

@Module({
    providers: [StripeSubscriptionItemsService],
    exports: [StripeSubscriptionItemsService]
})
export class StripeSubscriptionItemsModule {}
