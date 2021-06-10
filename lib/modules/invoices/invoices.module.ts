import { Module } from "@nestjs/common";
import { StripeInvoicesService } from "./services/invoices.service";

@Module({
    providers: [StripeInvoicesService],
    exports: [StripeInvoicesService]
})
export class StripeInvoicesModule {}
