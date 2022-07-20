import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { GLOBAL_CONFIG } from "../../../constants";
import { StripeConfigModel } from "../../config";
import { StripeWebhooksService } from "../services/stripe-webhooks.service";

@Injectable()
export class StripeWebhooksGuard implements CanActivate {
    constructor(
        @Inject(GLOBAL_CONFIG) public readonly global: StripeConfigModel,
        private readonly stripeWebhooksService: StripeWebhooksService
    ) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>  {
        if (!this.global.webhookSecret) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        try {
            const signature = request.headers["stripe-signature"];
            return !!this.stripeWebhooksService.constructEvent(request.body, signature, this.global.webhookSecret as string);
        } catch (error) {
            return false;
        }
    }
}
