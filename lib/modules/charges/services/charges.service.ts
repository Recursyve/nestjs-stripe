import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeChargesService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(params?: Stripe.ChargeCreateParams) {
        return this.stripe.charges.create(params);
    }

    public capture(id: string, params?: Stripe.ChargeCaptureParams) {
        return this.stripe.charges.capture(id, params);
    }

    public retrieve(id: string, params?: Stripe.ChargeRetrieveParams) {
        return this.stripe.charges.retrieve(id, params);
    }

    public list(id: string, params?: Stripe.ChargeListParams) {
        return this.stripe.charges.list(params);
    }

    public update(id: string, params?: Stripe.ChargeUpdateParams) {
        return this.stripe.charges.update(id, params);
    }
}
