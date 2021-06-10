import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeProductsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto?: Stripe.ProductCreateParams) {
        return this.stripe.products.create(dto);
    }

    public update(id: string, dto?: Stripe.ProductUpdateParams) {
        return this.stripe.products.update(id, dto);
    }

    public delete<T extends Stripe.Response<Stripe.DeletedProduct>>(
        id: string,
        params?: Stripe.ProductDeleteParams
    ): Promise<T> {
        return this.stripe.products.del(id, params) as Promise<T>;
    }

    public retrieve<T extends Stripe.Response<Stripe.Product>>(
        id: string,
        params?: Stripe.ProductRetrieveParams
    ): Promise<T> {
        return this.stripe.products.retrieve(id, params) as Promise<T>;
    }

    public list<T extends Stripe.Product>(params?: Stripe.ProductListParams): Stripe.ApiListPromise<T> {
        return this.stripe.products.list(params) as Stripe.ApiListPromise<T>;
    }
}
