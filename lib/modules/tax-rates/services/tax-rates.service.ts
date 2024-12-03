import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeTaxRatesService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {}

    public create(
        dto: Stripe.TaxRateCreateParams
    ): Promise<Stripe.Response<Stripe.TaxRate>> {
        return this.stripe.taxRates.create(dto);
    }

    public update(
        id: string,
        dto: Stripe.TaxRateUpdateParams
    ): Promise<Stripe.Response<Stripe.TaxRate>> {
        return this.stripe.taxRates.update(id, dto);
    }

    public retrieve(id: string): Promise<Stripe.Response<Stripe.TaxRate>> {
        return this.stripe.taxRates.retrieve(id);
    }

    public list(
        dto: Stripe.TaxRateListParams
    ): Stripe.ApiListPromise<Stripe.TaxRate> {
        return this.stripe.taxRates.list(dto);
    }
}
