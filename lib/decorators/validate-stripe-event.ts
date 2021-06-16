import { UseGuards } from "@nestjs/common";
import { HooksGuard } from "../guards/hooks.guard";

export const ValidateStripeEvent = () => UseGuards(HooksGuard)
