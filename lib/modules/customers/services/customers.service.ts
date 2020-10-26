import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeCustomersService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(dto?: Stripe.CustomerCreateParams) {
        return this.stripe.customers.create(dto);
    }

    public update(id: string, dto?: Stripe.CustomerUpdateParams) {
        return this.stripe.customers.update(id, dto);
    }

    public retrieve<T extends (Stripe.Customer | Stripe.DeletedCustomer)>(
        id: string,
        params?: Stripe.CustomerRetrieveParams
    ): Promise<T> {
        return this.stripe.customers.retrieve(id, params) as Promise<T>;
    }

    public createSource<T extends Stripe.CustomerSource>(
        id: string,
        source: string,
        params?: Omit<Stripe.CustomerSourceCreateParams, "source">
    ): Promise<T> {
        return this.stripe.customers.createSource(id, {
            ...params ?? {},
            source
        }) as Promise<T>;
    }

    public retrieveSource<T extends Stripe.CustomerSource>(
        customerId: string,
        sourceId: string,
        params?: Stripe.CustomerSourceRetrieveParams
    ): Promise<T> {
        return this.stripe.customers.retrieveSource(customerId, sourceId, params) as Promise<T>;
    }

    public listSource<T extends Stripe.CustomerSource>(
        customerId: string,
        params?: Stripe.CustomerSourceListParams
    ): Stripe.ApiListPromise<T> {
        return this.stripe.customers.listSources(customerId, params) as Stripe.ApiListPromise<T>;
    }

    public deleteSource<T extends
        | Stripe.CustomerSource
        | Stripe.DeletedAlipayAccount
        | Stripe.DeletedBankAccount
        | Stripe.DeletedBitcoinReceiver
        | Stripe.DeletedCard
    >(
        customerId: string,
        sourceId: string,
        params?: Stripe.CustomerSourceDeleteParams
    ): Promise<T> {
        return this.stripe.customers.deleteSource(customerId, sourceId, params) as Promise<T>;
    }
}
