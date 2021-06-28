import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import { StripeConfigService } from "../modules/config/services/stripe-config.service";
import { StripeWebhooksService } from "../modules/webhooks";
import {PATH_METADATA} from "@nestjs/common/constants";
import {Reflector} from "@nestjs/core";

@Injectable()
export class StripeWebhooksGuard implements CanActivate {
    constructor(
        private readonly stripeConfigService: StripeConfigService,
        @Inject("StripeWebhooksService") private readonly stripeWebhooksService: StripeWebhooksService,
        private readonly reflector: Reflector
    ) {
    }

    public canActivate(context: ExecutionContext): boolean  {
        const path = this.reflector.get<string>(PATH_METADATA, context.getHandler());
        console.log(path)
        const request = context.switchToHttp().getRequest();

        const endpointSecret = this.stripeConfigService.global?.webhookSecrets[path];

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
