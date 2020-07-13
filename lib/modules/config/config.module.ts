import { Module } from "@nestjs/common";
import { StripeConfigService } from "./services/stripe-config.service";

@Module({
    providers: [StripeConfigService],
    exports: [StripeConfigService]
})
export class StripeConfigModule {}
