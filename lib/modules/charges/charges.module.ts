import { Module } from "@nestjs/common";
import { StripeChargesService } from "./services/charges.service";

@Module({
    providers: [StripeChargesService],
    exports: [StripeChargesService]
})
export class StripeChargesModule {}
