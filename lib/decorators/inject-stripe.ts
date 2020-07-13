import { Inject } from "@nestjs/common";
import { STRIPE_CLIENT } from "../constants";

export const InjectStripe = () => Inject(STRIPE_CLIENT);
