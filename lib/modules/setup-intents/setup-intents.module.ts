import { Module } from "@nestjs/common";
import { StripeSetupIntentsService } from "./services/setup-intents.service";

@Module({
    providers: [StripeSetupIntentsService],
    exports: [StripeSetupIntentsService],
})
export class StripeSetupIntentsModule {}
