import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripePaymentIntentsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto: Stripe.PaymentIntentCreateParams) {
        return this.stripe.paymentIntents.create(dto);
    }

    public update(id: string, dto?: Stripe.PaymentIntentUpdateParams) {
        return this.stripe.paymentIntents.update(id, dto);
    }

    public cancel<T extends Stripe.Response<Stripe.PaymentIntent>>(
        id: string,
        params?: Stripe.PaymentIntentCancelParams
    ): Promise<T> {
        return this.stripe.paymentIntents.cancel(id, params) as Promise<T>;
    }

    public retrieve<T extends Stripe.Response<Stripe.PaymentIntent>>(
        id: string,
        params?: Stripe.PaymentIntentRetrieveParams
    ): Promise<T> {
        return this.stripe.paymentIntents.retrieve(id, params) as Promise<T>;
    }

    public list<T extends Stripe.PaymentIntent>(
        params?: Stripe.PaymentIntentListParams
    ): Stripe.ApiListPromise<T> {
        return this.stripe.paymentIntents.list(params) as Stripe.ApiListPromise<T>;
    }

    public capture<T extends Stripe.Response<Stripe.PaymentIntent>>(
        id: string,
        params?: Stripe.PaymentIntentCaptureParams
    ): Promise<T> {
        return this.stripe.paymentIntents.capture(id, params) as Promise<T>;
    }

    public confirm<T extends Stripe.Response<Stripe.PaymentIntent>>(
        id: string,
        params?: Stripe.PaymentIntentConfirmParams
    ): Promise<T> {
        return this.stripe.paymentIntents.confirm(id, params) as Promise<T>;
    }
}
