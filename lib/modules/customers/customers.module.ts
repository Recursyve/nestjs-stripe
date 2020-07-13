import { Module } from "@nestjs/common";
import { StripeCustomersService } from "./services/customers.service";

@Module({
    providers: [StripeCustomersService],
    exports: [StripeCustomersService]
})
export class StripeCustomersModule {}
