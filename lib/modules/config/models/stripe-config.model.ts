export interface StripeConfigModel {
    clientSecret: string;
    webhookSecret?: string;
}

export class StripeConfigModel {
    public clientSecret: string;
    public webhookSecret?: string;

    constructor(config: Partial<StripeConfigModel>) {
        this.clientSecret = config.clientSecret ?? process.env.STRIPE_CLIENT_SECRET;
        this.webhookSecret = config.webhookSecret ?? process.env.WEBHOOK_SECRET;
    }
}
