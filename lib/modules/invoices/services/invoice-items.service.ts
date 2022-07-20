import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeInvoiceItemsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto: Stripe.InvoiceItemCreateParams) {
        return this.stripe.invoiceItems.create(dto);
    }

    public update(id: string, dto?: Stripe.InvoiceItemUpdateParams) {
        return this.stripe.invoiceItems.update(id, dto);
    }

    public delete<T extends Stripe.Response<Stripe.DeletedInvoiceItem>>(
        id: string,
        params?: Stripe.InvoiceItemDeleteParams
    ): Promise<T> {
        return this.stripe.invoiceItems.del(id, params) as Promise<T>;
    }

    public list<T extends Stripe.InvoiceItem>(params?: Stripe.InvoiceItemListParams): Stripe.ApiListPromise<T> {
        return this.stripe.invoiceItems.list(params) as Stripe.ApiListPromise<T>;
    }

    public retrieve<T extends Stripe.Response<Stripe.InvoiceItem>>(
        id: string,
        params?: Stripe.InvoiceRetrieveParams
    ): Promise<T> {
        return this.stripe.invoiceItems.retrieve(id, params) as Promise<T>;
    }
}
