import { Module } from "@nestjs/common";
import { StripePricesService } from "./services/prices.service";

@Module({
    providers: [StripePricesService],
    exports: [StripePricesService]
})
export class StripePricesModule {}
