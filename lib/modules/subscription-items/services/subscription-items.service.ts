import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeSubscriptionItemsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(
        dto: Stripe.SubscriptionItemCreateParams
    ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
        return this.stripe.subscriptionItems.create(dto);
    }

    public update(
        id: string,
        dto: Stripe.SubscriptionItemUpdateParams
    ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
        return this.stripe.subscriptionItems.update(id, dto);
    }

    public retrieve(
        id: string
    ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
        return this.stripe.subscriptionItems.retrieve(id);
    }

    public list(
        dto: Stripe.SubscriptionItemListParams
    ): Stripe.ApiListPromise<Stripe.SubscriptionItem> {
        return this.stripe.subscriptionItems.list(dto);
    }

    public delete(
        id: string
    ): Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>> {
        return this.stripe.subscriptionItems.del(id);
    }
}
