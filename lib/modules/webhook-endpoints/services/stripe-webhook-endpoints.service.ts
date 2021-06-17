import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeWebhookEndpointsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    public create(dto?: Stripe.WebhookEndpointCreateParams) {
        return this.stripe.webhookEndpoints.create(dto);
    }

    public update(id: string, dto?: Stripe.WebhookEndpointUpdateParams) {
        return this.stripe.webhookEndpoints.update(id, dto);
    }

    public retrieve<T extends Stripe.Response<Stripe.WebhookEndpoint>>(
        id: string,
        params?: Stripe.WebhookEndpointRetrieveParams
    ): Promise<T> {
        return this.stripe.webhookEndpoints.retrieve(id, params) as Promise<T>;
    }

    public list<T extends Stripe.WebhookEndpoint>(params?: Stripe.WebhookEndpointListParams): Stripe.ApiListPromise<T> {
        return this.stripe.webhookEndpoints.list(params) as Stripe.ApiListPromise<T>;
    }

    public delete<T extends Stripe.Response<Stripe.DeletedWebhookEndpoint>>(
        id: string,
        params?: Stripe.WebhookEndpointDeleteParams
    ): Promise<T> {
        return this.stripe.webhookEndpoints.del(id, params) as Promise<T>;
    }
}
