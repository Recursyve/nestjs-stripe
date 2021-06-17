import { UseGuards } from "@nestjs/common";
import { StripeWebhooksGuard } from "../guards/stripe-webhooks.guard";

export const ValidateStripeEvent = () => UseGuards(StripeWebhooksGuard)
