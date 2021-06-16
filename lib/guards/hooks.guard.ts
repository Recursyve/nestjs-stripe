import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {StripeConfigService} from "../modules/config/services/stripe-config.service";
import {StripeWebHooksService} from "../modules/webhooks";

@Injectable()
export class HooksGuard implements CanActivate {
    constructor(
        private readonly stripeConfigService: StripeConfigService,
        private readonly stripeWebHooksService: StripeWebHooksService
    ) {
    }

    public canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest();
        const endpointSecret = this.stripeConfigService.global?.webhookEndpointSecret;

        if(!endpointSecret) {
            return false;
        }

        const signature = request.headers["stripe-signature"];
        try {
            return !!this.stripeWebHooksService.constructEvent(request.body, signature, endpointSecret);
        } catch (error) {
            return false;
        }
    }
}
