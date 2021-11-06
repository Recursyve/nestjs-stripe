import { Module } from "@nestjs/common";
import { StripeInvoiceItemsService } from "./services/invoice-items.service";
import { StripeInvoicesService } from "./services/invoices.service";

@Module({
    providers: [StripeInvoicesService, StripeInvoiceItemsService],
    exports: [StripeInvoicesService, StripeInvoiceItemsService]
})
export class StripeInvoicesModule {}
