import { Module } from "@nestjs/common";
import { StripeProductsService } from "./services/products.service";

@Module({
    providers: [StripeProductsService],
    exports: [StripeProductsService]
})
export class StripeProductsModule {}
