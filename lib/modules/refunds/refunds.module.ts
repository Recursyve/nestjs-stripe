import { Module } from "@nestjs/common";
import { StripeRefundsService } from "./services/refunds.service";

@Module({
    providers: [StripeRefundsService],
    exports: [StripeRefundsService]
})
export class StripeRefundsModule {}
