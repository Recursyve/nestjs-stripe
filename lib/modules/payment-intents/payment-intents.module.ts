import { Module } from "@nestjs/common";
import { StripePaymentIntentsService } from "./services/payment-intents.service";

@Module({
    providers: [StripePaymentIntentsService],
    exports: [StripePaymentIntentsService]
})
export class StripePaymentIntentsModule {}
