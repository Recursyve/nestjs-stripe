import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripe } from "../../../decorators/inject-stripe";

@Injectable()
export class StripeSubscriptionsService {
    constructor(@InjectStripe() private readonly stripe: Stripe) {
    }
}
