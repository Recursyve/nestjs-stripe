import { Module } from "@nestjs/common";
import { StripeWebhookEndpointsService } from "./services/stripe-webhook-endpoints.service";

@Module({
    providers: [StripeWebhookEndpointsService],
    exports: [StripeWebhookEndpointsService]
})
export class StripeWebhookEndpointsModule {}
