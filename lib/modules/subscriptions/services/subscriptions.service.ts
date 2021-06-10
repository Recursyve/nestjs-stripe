import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeSubscriptionsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto?: Stripe.SubscriptionCreateParams) {
        return this.stripe.subscriptions.create(dto);
    }

    public update(id: string, dto?: Stripe.SubscriptionUpdateParams) {
        return this.stripe.subscriptions.update(id, dto);
    }

    public delete<T extends Stripe.Response<Stripe.Subscription>>(
        id: string,
        params?: Stripe.SubscriptionDeleteParams
    ):Promise<T> {
        return this.stripe.subscriptions.del(id, params) as Promise<T>;
    }

    public deleteDiscount<T extends Stripe.Response<Stripe.DeletedDiscount>>(
        id: string,
        params?: Stripe.SubscriptionDeleteDiscountParams
    ): Promise<T> {
        return this.stripe.subscriptions.deleteDiscount(id, params) as Promise<T>;
    }

    public retrieve<T extends Stripe.Response<Stripe.Subscription>>(
        id: string,
        params?: Stripe.SubscriptionRetrieveParams
    ): Promise<T> {
        return this.stripe.subscriptions.retrieve(id, params) as Promise<T>;
    }

    public list<T extends Stripe.Subscription>(params?: Stripe.SubscriptionListParams): Stripe.ApiListPromise<T> {
        return this.stripe.subscriptions.list(params) as Stripe.ApiListPromise<T>;
    }
}
