import {DynamicModule, ForwardReference, Global, Module, Type} from "@nestjs/common";
import {Stripe} from "stripe";
import {GLOBAL_CONFIG, STRIPE_CLIENT} from "../constants";
import {StripeConfigModel} from "./config";
import {StripeWebhookHandlerService, StripeWebHooksModule} from "./webhooks";

export interface StripeOptions {
    config?: Partial<StripeConfigModel>;
}

export interface StripeFeatureConfig {
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    provide?: Type<StripeWebhookHandlerService>;
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
                }
            ],
            exports: [GLOBAL_CONFIG, STRIPE_CLIENT]
        };
    }

    public static forFeature(options?: StripeFeatureConfig): DynamicModule {
        return {
            module: StripeModule,
            imports: [...options.imports, StripeWebHooksModule],
            providers: [
                {
                    provide: StripeWebhookHandlerService,
                    useClass: options?.provide
                }
            ]
        };
    }
}
