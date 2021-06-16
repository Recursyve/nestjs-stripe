import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export class StripeEventPipe<T> implements PipeTransform {
    public transform(value: Stripe.Event, metadata: ArgumentMetadata): T {
        return value.data.object as T;
    }
}
