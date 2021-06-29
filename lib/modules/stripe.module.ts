import { DynamicModule, ForwardReference, Global, Module, Type } from "@nestjs/common";
import { Stripe } from "stripe";
import { GLOBAL_CONFIG, STRIPE_CLIENT } from "../constants";
import { StripeConfigModel } from "./config";
import { StripeWebhookHandlerService, StripeWebHooksModule } from "./webhooks";

export interface StripeOptions {
    config?: Partial<StripeConfigModel>;
    webhookHandler?: Type<StripeWebhookHandlerService>;
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;
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
            imports: [...options.imports, StripeWebHooksModule],
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
                {
                    provide: StripeWebhookHandlerService,
                    useClass: options?.webhookHandler
                }
            ],
            exports: [GLOBAL_CONFIG, STRIPE_CLIENT, StripeWebhookHandlerService]
        };
    }

}
