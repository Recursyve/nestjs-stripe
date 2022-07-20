import { Stripe } from "stripe";

export class StripeReportingReportRunWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly reportRun: Stripe.Reporting.ReportRun
    ) {}
}

export class StripeReportingReportTypeWebhookEvent {
    constructor(
        public readonly event: string,
        public readonly reportType: Stripe.Reporting.ReportType
    ) {}
}
