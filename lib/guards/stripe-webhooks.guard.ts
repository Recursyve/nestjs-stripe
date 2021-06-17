import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { StripeConfigService } from "../modules/config/services/stripe-config.service";
import { StripeWebhooksService } from "../modules/webhooks";

@Injectable()
export class StripeWebhooksGuard implements CanActivate {
    constructor(
        private readonly stripeConfigService: StripeConfigService,
        private readonly stripeWebhooksService: StripeWebhooksService
    ) {
    }

    public canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest();
        const endpointSecret = this.stripeConfigService.global?.webhookSecret;

        if (!endpointSecret) {
            return false;
        }

        const signature = request.headers["stripe-signature"];
        try {
            return !!this.stripeWebhooksService.constructEvent(request.body, signature, endpointSecret);
        } catch (error) {
            return false;
        }
    }
}
