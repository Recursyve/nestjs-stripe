import { CanActivate, ExecutionContext, Inject, Injectable, Optional } from "@nestjs/common";
import { PATH_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";
import { GLOBAL_CONFIG } from "../constants";
import { StripeConfigModel } from "../modules/config";
import { StripeWebhooksService } from "../modules/webhooks";

@Injectable()
export class StripeWebhooksGuard implements CanActivate {
    constructor(
        @Optional() private readonly stripeWebhooksService: StripeWebhooksService,
        @Inject(GLOBAL_CONFIG) public readonly global: StripeConfigModel,
        private readonly reflector: Reflector
    ) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>  {
        if (!this.stripeWebhooksService) {
            return;
        }

        const path = this.reflector.get<string>(PATH_METADATA, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const endpointSecret = this.global.webhookSecrets[path];

        if (!endpointSecret) {
            return false;
        }

        try {
            const signature = request.headers["stripe-signature"];
            return !!this.stripeWebhooksService.constructEvent(request.body, signature, endpointSecret);
        } catch (error) {
            return false;
        }
    }
}
