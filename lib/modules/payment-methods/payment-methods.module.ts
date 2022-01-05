import { Module } from "@nestjs/common";
import { StripePaymentMethodsService } from "./services/payment-methods.service";

@Module({
    providers: [StripePaymentMethodsService],
    exports: [StripePaymentMethodsService]
})
export class StripePaymentMethodsModule {}
