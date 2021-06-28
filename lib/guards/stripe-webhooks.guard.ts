import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { StripeConfigService } from "../modules/config/services/stripe-config.service";
import { StripeWebhooksService } from "../modules/webhooks";
import { PATH_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";

@Injectable()
export class StripeWebhooksGuard implements CanActivate {
    constructor(
        @Inject("StripeWebhooksService") private readonly stripeWebhooksService: StripeWebhooksService,
        private readonly stripeConfigService: StripeConfigService,
        private readonly reflector: Reflector
    ) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>  {
        const path = this.reflector.get<string>(PATH_METADATA, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const endpointSecret = this.stripeConfigService.global?.webhookSecrets[path];

        if (!endpointSecret) {
            return false;
        }

        try {
            const signature = request.headers["stripe-signature"];
            return !!this.stripeWebhooksService.constructEvent(request.rawBody, signature, endpointSecret);
        } catch (error) {
            return false;
        }
    }
}
