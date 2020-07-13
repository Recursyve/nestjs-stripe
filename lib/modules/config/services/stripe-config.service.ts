import { Inject, Injectable } from "@nestjs/common";
import { StripeConfigModel } from "../models/stripe-config.model";
import { GLOBAL_CONFIG } from "../../../constants";

@Injectable()
export class StripeConfigService {
    constructor(@Inject(GLOBAL_CONFIG) public readonly global: StripeConfigModel) {}
}
