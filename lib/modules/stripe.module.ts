import { DynamicModule, ForwardReference, Global, Module, Type } from "@nestjs/common";
import { Stripe } from "stripe";
import { GLOBAL_CONFIG, STRIPE_CLIENT } from "../constants";
import { StripeConfigModel } from "./config";
import { StripeWebhookHandlerService } from "./webhooks";
import { StripeWebhooksController } from "./webhooks/controllers/stripe-webhooks.controller";

export interface StripeOptions {
    config?: Partial<StripeConfigModel>;
    imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
    webhookHandler?: Type<StripeWebhookHandlerService>;
}

@Global()
@Module({})
export class StripeModule {
    public static forRoot(options?: StripeOptions): DynamicModule {
        if (!options) {
            options = {
                config: {}
            };
        }
        return {
            module: StripeModule,
            imports: options?.imports ? [...options.imports] : [],
            controllers: [StripeWebhooksController],
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: new StripeConfigModel(options.config)
                },
                {
                    provide: STRIPE_CLIENT,
                    useFactory: (config: StripeConfigModel) => {
                        return new Stripe(config.clientSecret, {
                            apiVersion: "2020-08-27"
                        });
                    },
                    inject: [GLOBAL_CONFIG]
                },
                options?.webhookHandler ? {
                    provide: StripeWebhookHandlerService,
                    useClass: options?.webhookHandler
                } : undefined,
            ].filter((x) => !!x),
            exports: [GLOBAL_CONFIG, STRIPE_CLIENT]
        };
    }
}
