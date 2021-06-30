import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export class StripeEventPipe<T> implements PipeTransform {
    public transform(rawRequestBody: Buffer, metadata: ArgumentMetadata): T {
        const stripeEvent = JSON.parse(rawRequestBody.toString()) as Stripe.Event;
        return stripeEvent.data.object as T;
    }
}
