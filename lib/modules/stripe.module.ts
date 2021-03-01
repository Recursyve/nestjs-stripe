import { DynamicModule, Global, Module } from "@nestjs/common";
import { Stripe } from "stripe";
import { GLOBAL_CONFIG, STRIPE_CLIENT } from "../constants";
import { StripeConfigModel } from "./config";

export interface StripeOptions {
    config?: Partial<StripeConfigModel>;
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
}
