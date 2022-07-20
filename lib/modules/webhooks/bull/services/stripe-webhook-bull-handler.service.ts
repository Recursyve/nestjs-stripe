import * as NestJsBull from "@nestjs/bull";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Queue } from "bull";
import { Stripe } from "stripe";
import { StripeWebhookHandlerService } from "../../services/stripe-webhook-handler.service";

@Injectable()
export class StripeWebhookBullHandlerService extends StripeWebhookHandlerService implements OnModuleInit {
    // @ts-ignore
    private queue: Queue;

    constructor(private moduleRef: ModuleRef) {
        super();
    }

    public onModuleInit(): void {
        const { getQueueToken } = require("@nestjs/bull") as typeof NestJsBull;
        this.queue = this.moduleRef.get<Queue>(getQueueToken("stripe-webhooks"), { strict: false });
    }

    public async handleEvent(event: Stripe.Event): Promise<void> {
        await this.queue.add(event.type, event.data.object);
    }
}
