import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripePaymentMethodsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public retrieve<T extends Stripe.Response<Stripe.PaymentMethod>>(id: string): Promise<T> {
        return this.stripe.paymentMethods.retrieve(id) as Promise<T>;
    }

    public attach<T extends Stripe.Response<Stripe.PaymentMethod>>(id: string, customerId: string): Promise<T> {
        return this.stripe.paymentMethods.attach(id, { customer: customerId }) as Promise<T>;
    }

    public detach<T extends Stripe.Response<Stripe.PaymentMethod>>(id: string): Promise<T> {
        return this.stripe.paymentMethods.detach(id) as Promise<T>;
    }

    public update<T extends Stripe.Response<Stripe.PaymentMethod>>(id: string, dto?: Stripe.PaymentMethodUpdateParams): Promise<T> {
        return this.stripe.paymentMethods.update(id, dto) as Promise<T>;
    }
}
