import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeSetupIntentsService {
  constructor(@InjectStripe() private readonly stripe: Stripe) {}

  public create(
    dto: Stripe.SetupIntentCreateParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.create(dto);
  }

  public update(
    id: string,
    dto?: Stripe.SetupIntentUpdateParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.update(id, dto);
  }

  public retrieve(
    id: string,
    params?: Stripe.SetupIntentRetrieveParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.retrieve(id, params);
  }

  public list(
    params?: Stripe.SetupIntentListParams
  ): Stripe.ApiListPromise<Stripe.SetupIntent> {
    return this.stripe.setupIntents.list(params);
  }

  public cancel(
    id: string,
    params?: Stripe.SetupIntentCancelParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.cancel(id, params);
  }

  public confirm(
    id: string,
    params?: Stripe.SetupIntentConfirmParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.confirm(id, params);
  }

  public verifyMicrodeposits(
    id: string,
    params?: Stripe.SetupIntentVerifyMicrodepositsParams
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    return this.stripe.setupIntents.verifyMicrodeposits(id, params);
  }
}
