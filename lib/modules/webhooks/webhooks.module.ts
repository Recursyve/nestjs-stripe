import { DynamicModule, ForwardReference, Module, Type } from "@nestjs/common";
import { StripeWebhooksController } from "./controllers/stripe-webhooks.controller";
import { StripeWebhookHandlerService } from "./services/stripe-webhook-handler.service";
import { StripeWebhooksService } from "./services/stripe-webhooks.service";

export interface CustomStripeWebhooksOptions {
    imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
    webhookHandler: Type<StripeWebhookHandlerService>;
}

export interface ImportsStripeWebhooksOptions {
    imports: [(Type | DynamicModule | Promise<DynamicModule> | ForwardReference)];
}

export type StripeWebhooksOptions = CustomStripeWebhooksOptions | ImportsStripeWebhooksOptions;

@Module({
    controllers: [StripeWebhooksController],
    providers: [StripeWebhooksService]
})
export class StripeWebhooksModule {
    public static forRoot(options: StripeWebhooksOptions): DynamicModule {
        return {
            module: StripeWebhooksModule,
            imports: options?.imports ? [...options.imports] : [],
            providers: (options as CustomStripeWebhooksOptions).webhookHandler ? [
                {
                    provide: StripeWebhookHandlerService,
                    useClass: (options as CustomStripeWebhooksOptions).webhookHandler
                }
            ] : []
        };
    }
}
