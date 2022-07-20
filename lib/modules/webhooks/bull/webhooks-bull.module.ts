import * as NestJSBull from "@nestjs/bull";
import { DynamicModule, Module } from "@nestjs/common";
import { checkPackages } from "../../../utils/check-package.utils";
import { StripeWebhookHandlerService } from "../services/stripe-webhook-handler.service";
import { StripeWebhookBullHandlerService } from "./services/stripe-webhook-bull-handler.service";

@Module({})
export class StripeWebhooksBullModule {
    public static forRoot(): DynamicModule {
        this.checkDependantPackages();

        const { BullModule } = require("@nestjs/bull") as typeof NestJSBull;
        return {
            module: StripeWebhooksBullModule,
            imports: [
                BullModule.registerQueue({
                    name: "stripe-webhooks"
                })
            ],
            providers: [
                {
                    provide: StripeWebhookHandlerService,
                    useClass: StripeWebhookBullHandlerService
                }
            ],
            exports: [StripeWebhookHandlerService]
        };
    }

    private static checkDependantPackages(): void {
        checkPackages(["@nestjs/bull", "bull"], this.constructor.name);
    }
}
