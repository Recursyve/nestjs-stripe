export interface StripeConfigModel {
    clientSecret: string;
    webhookSecrets?: StripeWebhooksSecretsConfigModel;
}

export interface StripeWebhooksSecretsConfigModel {
    [route: string]: string;
}

export class StripeConfigModel {
    public clientSecret: string;
    public webhookSecrets?: StripeWebhooksSecretsConfigModel;

    constructor(config: Partial<StripeConfigModel>) {
        this.clientSecret = config.clientSecret ?? process.env.STRIPE_CLIENT_SECRET;
        this.webhookSecrets = config.webhookSecrets
    }
}
