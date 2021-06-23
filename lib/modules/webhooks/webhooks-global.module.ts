import {Global, Module} from "@nestjs/common";
import {StripeWebhooksService} from "./services/stripe-webhooks.service";

@Global()
@Module({
    providers: [StripeWebhooksService],
    exports: [StripeWebhooksService]
})
export class WebhooksGlobalModule {
}
