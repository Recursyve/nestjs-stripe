import {DynamicModule, Global, Module, Type} from "@nestjs/common";
import { Stripe } from "stripe";
import { GLOBAL_CONFIG, STRIPE_CLIENT } from "../constants";
import { StripeConfigModel } from "./config";
import {InvoiceHookHandlerService} from "./webhooks/services/invoice-hook-handler.service";

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

    public static forFeature(service: Type): DynamicModule {
        return {
            module: StripeModule,
            providers: [
                {
                    provide: InvoiceHookHandlerService,
                    useClass: service
                }
            ],
            exports: [service]
        };
    }
}
