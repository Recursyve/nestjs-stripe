import * as NestJsBull from "@nestjs/bull";

export const StripeWebhooksProcessor = () => {
    const { Processor } = require("@nestjs/bull") as typeof NestJsBull;
    return Processor({ name: "stripe-webhooks" });
};
