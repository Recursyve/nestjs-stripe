import { DynamicModule, Global, Module } from "@nestjs/common";
import { Stripe } from "stripe";
import { GLOBAL_CONFIG, STRIPE_CLIENT } from "../constants";
import { StripeConfigModel } from "./config";
import { StripeWebhooksModule, StripeWebhooksOptions } from "./webhooks/webhooks.module";

export interface StripeOptions {
    config?: Partial<StripeConfigModel>;
    webhooks?: StripeWebhooksOptions;
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

        const imports = [];
        if (options.webhooks) {
            imports.push(StripeWebhooksModule.forRoot(options.webhooks));
        }

        return {
            module: StripeModule,
            imports,
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: new StripeConfigModel(options.config ?? {})
                },
                {
                    provide: STRIPE_CLIENT,
                    useFactory: (config: StripeConfigModel) => {
                        return new Stripe(config.clientSecret, {
                            apiVersion: "2020-08-27"
                        });
                    },
                    inject: [GLOBAL_CONFIG]
                }
            ],
            exports: [GLOBAL_CONFIG, STRIPE_CLIENT]
        };
    }
}
