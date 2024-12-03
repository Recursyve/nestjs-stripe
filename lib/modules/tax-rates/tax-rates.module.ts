import { Module } from "@nestjs/common";
import { StripeTaxRatesService } from "./services/tax-rates.service";

@Module({
    providers: [StripeTaxRatesService],
    exports: [StripeTaxRatesService]
})
export class StripeTaxRatesModule {}
