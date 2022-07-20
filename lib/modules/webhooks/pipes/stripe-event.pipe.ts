import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export class StripeEventPipe implements PipeTransform {
    public transform(rawRequestBody: Buffer, metadata: ArgumentMetadata): Stripe.Event {
        return JSON.parse(rawRequestBody.toString()) as Stripe.Event;
    }
}
