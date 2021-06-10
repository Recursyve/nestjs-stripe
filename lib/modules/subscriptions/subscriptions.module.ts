import { Module } from "@nestjs/common";
import { StripeSubscriptionsService } from "./services/subscriptions.service";

@Module({
    providers: [StripeSubscriptionsService],
    exports: [StripeSubscriptionsService]
})
export class StripeSubscriptionsModule {}
