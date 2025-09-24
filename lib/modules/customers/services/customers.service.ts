import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

/**
 * @deprecated: Use @InjectStripe() instead
 */
@Injectable()
export class StripeCustomersService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(dto?: Stripe.CustomerCreateParams) {
        return this.stripe.customers.create(dto);
    }

    public update(id: string, dto?: Stripe.CustomerUpdateParams) {
        return this.stripe.customers.update(id, dto);
    }

    public retrieve<
        T extends Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>
    >(id: string, params?: Stripe.CustomerRetrieveParams): Promise<T> {
        return this.stripe.customers.retrieve(id, params) as Promise<T>;
    }

    public list(params?: Stripe.CustomerListParams) {
        return this.stripe.customers.list(params);
    }

    public del<T extends Stripe.Response<Stripe.DeletedCustomer>>(
        customerId: string,
        params?: Stripe.CustomerDeleteParams
    ): Promise<T> {
        return this.stripe.customers.del(customerId, params) as Promise<T>;
    }

    public createSource<T extends Stripe.Response<Stripe.CustomerSource>>(
        id: string,
        source: string,
        params?: Omit<Stripe.CustomerCreateSourceParams, "source">
    ): Promise<T> {
        return this.stripe.customers.createSource(id, {
            ...(params ?? {}),
            source,
        }) as Promise<T>;
    }

    public retrieveSource<T extends Stripe.Response<Stripe.CustomerSource>>(
        customerId: string,
        sourceId: string,
        params?: Stripe.CustomerRetrieveSourceParams
    ): Promise<T> {
        return this.stripe.customers.retrieveSource(
            customerId,
            sourceId,
            params
        ) as Promise<T>;
    }

    public listSource<T extends Stripe.CustomerSource>(
        customerId: string,
        params?: Stripe.CustomerListSourcesParams
    ): Stripe.ApiListPromise<T> {
        return this.stripe.customers.listSources(
            customerId,
            params
        ) as Stripe.ApiListPromise<T>;
    }

    public deleteSource<
        T extends Stripe.Response<
            Stripe.CustomerSource | Stripe.DeletedCustomerSource
        >
    >(
        customerId: string,
        sourceId: string,
        params?: Stripe.CustomerDeleteSourceParams
    ): Promise<T> {
        return this.stripe.customers.deleteSource(
            customerId,
            sourceId,
            params
        ) as Promise<T>;
    }

    public retrievePaymentMethod(
        customerId: string,
        paymentMethodId: string,
        params?: Stripe.CustomerRetrievePaymentMethodParams
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        return this.stripe.customers.retrievePaymentMethod(
            customerId,
            paymentMethodId,
            params
        );
    }

    public listPaymentMethods(
        customerId: string,
        params?: Stripe.CustomerListPaymentMethodsParams
    ): Stripe.ApiListPromise<Stripe.PaymentMethod> {
        return this.stripe.customers.listPaymentMethods(customerId, params);
    }
}
