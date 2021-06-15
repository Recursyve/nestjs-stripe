import { Module } from "@nestjs/common";
import { StripeWebHookEndpointsService } from "./services/webhook-endpoints.service";

@Module({
    providers: [StripeWebHookEndpointsService],
    exports: [StripeWebHookEndpointsService]
})
export class StripeWebHookEndpointsModule {}
