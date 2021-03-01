import { Injectable } from "@nestjs/common";
import { InjectStripe } from "../../../decorators/inject-stripe";
import { Stripe } from "stripe";

@Injectable()
export class StripeRefundsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(params?: Stripe.RefundCreateParams): Promise<Stripe.Refund> {
        return this.stripe.refunds.create(params);
    }

    public retrieve(id: string, params?: Stripe.RefundRetrieveParams): Promise<Stripe.Refund> {
        return this.stripe.refunds.retrieve(id, params);
    }

    public update(id: string, params?: Stripe.RefundUpdateParams): Promise<Stripe.Refund> {
        return this.stripe.refunds.update(id, params);
    }

    public list(params?: Stripe.RefundListParams): Stripe.ApiListPromise<Stripe.Refund> {
        return this.stripe.refunds.list(params);
    }
}
