export interface StripeConfigModel {
    clientSecret: string;
    webhookEndpointSecret?: string;
}

export class StripeConfigModel {
    public clientSecret: string;
    public webhookEndpointSecret?: string;
    constructor(config: Partial<StripeConfigModel>) {
        this.clientSecret = config.clientSecret ?? process.env.STRIPE_CLIENT_SECRET;
        this.webhookEndpointSecret = config.webhookEndpointSecret ?? process.env.WEBHOOK_ENDPOINT_SECRET;
    }
}
