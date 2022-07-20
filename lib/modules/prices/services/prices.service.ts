import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripePricesService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto: Stripe.PriceCreateParams) {
        return this.stripe.prices.create(dto);
    }

    public update(id: string, dto?: Stripe.PriceUpdateParams) {
        return this.stripe.prices.update(id, dto);
    }

    public retrieve<T extends Stripe.Response<Stripe.Price>>(
        id: string,
        params?: Stripe.PriceRetrieveParams
    ): Promise<T> {
        return this.stripe.prices.retrieve(id, params) as Promise<T>;
    }

    public list<T extends Stripe.Price>(params?: Stripe.PriceListParams): Stripe.ApiListPromise<T> {
        return this.stripe.prices.list(params) as Stripe.ApiListPromise<T>;
    }
}
