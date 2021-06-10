import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeInvoicesService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto?: Stripe.InvoiceCreateParams) {
        return this.stripe.invoices.create(dto);
    }

    public update(id: string, dto?: Stripe.InvoiceUpdateParams) {
        return this.stripe.invoices.update(id, dto);
    }

    public voidInvoice<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoiceVoidInvoiceParams
    ): Promise<T> {
        return this.stripe.invoices.voidInvoice(id, params) as Promise<T>;
    }

    public delete<T extends Stripe.Response<Stripe.DeletedInvoice>>(
        id: string,
        params?: Stripe.InvoiceDeleteParams
    ): Promise<T> {
        return this.stripe.invoices.del(id, params) as Promise<T>;
    }

    public list<T extends Stripe.Invoice>(params?: Stripe.InvoiceListParams): Stripe.ApiListPromise<T> {
        return this.stripe.invoices.list(params) as Stripe.ApiListPromise<T>;
    }

    public sendInvoice<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoiceSendInvoiceParams
    ): Promise<T> {
        return this.stripe.invoices.sendInvoice(id, params) as Promise<T>;
    }

    public finalizeInvoice<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoiceFinalizeInvoiceParams
    ): Promise<T> {
        return this.stripe.invoices.finalizeInvoice(id, params) as Promise<T>;
    }

    public pay<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoicePayParams
    ): Promise<T> {
        return this.stripe.invoices.pay(id, params) as Promise<T>;
    }

    public retrieve<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoicePayParams
    ): Promise<T> {
        return this.stripe.invoices.retrieve(id, params) as Promise<T>;
    }

    public retrieveUpcoming<T extends Stripe.Response<Stripe.Invoice>>(params?: Stripe.InvoicePayParams): Promise<T> {
        return this.stripe.invoices.retrieveUpcoming(params) as Promise<T>;
    }

    public listLineItems<T extends Stripe.InvoiceLineItem>(
        id: string,
        params?: Stripe.InvoiceLineItemListParams
    ): Stripe.ApiListPromise<T> {
        return this.stripe.invoices.listLineItems(id, params) as Stripe.ApiListPromise<T>;
    }

    public listUpcomingLineItems<T extends Stripe.InvoiceLineItem>(
        params?: Stripe.InvoiceLineItemListUpcomingParams
    ): Stripe.ApiListPromise<T> {
        return this.stripe.invoices.listUpcomingLineItems(params) as Stripe.ApiListPromise<T>;
    }

    public markUncollectible<T extends Stripe.Response<Stripe.Invoice>>(
        id: string,
        params?: Stripe.InvoiceMarkUncollectibleParams
    ): Promise<T> {
        return this.stripe.invoices.markUncollectible(id, params) as Promise<T>;
    }
}
