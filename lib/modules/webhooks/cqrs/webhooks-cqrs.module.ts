import { DynamicModule, Module } from "@nestjs/common";
import * as NestJsCqrs from "@nestjs/cqrs";
import { checkPackages } from "../../../utils/check-package.utils";
import { StripeWebhookHandlerService } from "../services/stripe-webhook-handler.service";
import { StripeWebhookCqrsHandlerService } from "./services/stripe-webhook-cqrs-handler.service";

@Module({})
export class StripeWebhooksCqrsModule {
    public static forRoot(): DynamicModule {
        this.checkDependantPackages();

        const { CqrsModule } = require("@nestjs/cqrs") as typeof NestJsCqrs;
        return {
            module: StripeWebhooksCqrsModule,
            imports: [CqrsModule],
            providers: [
                {
                    provide: StripeWebhookHandlerService,
                    useClass: StripeWebhookCqrsHandlerService
                }
            ],
            exports: [StripeWebhookHandlerService]
        };
    }

    private static checkDependantPackages(): void {
        checkPackages(["@nestjs/cqrs"], this.constructor.name);
    }
}
