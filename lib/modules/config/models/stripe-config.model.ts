export interface StripeConfigModel {
    clientSecret: string;
}

export class StripeConfigModel {
    public clientSecret: string;

    constructor(config: Partial<StripeConfigModel>) {
        this.clientSecret = config.clientSecret ?? process.env.STRIPE_CLIENT_SECRET;
    }
}
