import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import * as NestJsCqrs from "@nestjs/cqrs";
import { Stripe } from "stripe";
import { StripeWebhookHandlerService } from "../../services/stripe-webhook-handler.service";
import { StripeAccountsWebhookEvent } from "../events/accounts.webhook.event";
import { StripeApplicationFeesWebhookEvent } from "../events/application-fees.webhook.event";
import { StripeBalancesWebhookEvent } from "../events/balances.webhook.event";
import { StripeBillingPortalConfigurationsWebhookEvent, StripeBillingPortalSessionsWebhookEvent } from "../events/billing-portals.webhook.event";
import { StripeCapabilitiesWebhookEvent } from "../events/capabilities.webhook.event";
import { StripeChargeDisputesWebhookEvent, StripeChargeRefundsWebhookEvent, StripeChargesWebhookEvent } from "../events/charges.webhook.event";
import { StripeCheckoutSessionsWebhookEvent } from "../events/checkout.webhook.event";
import { StripeCouponsWebhookEvent } from "../events/coupons.webhook.event";
import { StripeCreditNotesWebhookEvent } from "../events/credit-notes.webhook.event";
import {
    StripeCustomerDiscountsWebhookEvent,
    StripeCustomerSourcesWebhookEvent,
    StripeCustomerSubscriptionsWebhookEvent,
    StripeCustomersWebhookEvent,
    StripeCustomerTaxIdWebhookEvent
} from "../events/customers.webhook.event";
import { StripeFilesWebhookEvent } from "../events/files.webhook.event";
import { StripeFinancialConnectionAccountsWebhookEvent } from "../events/financial-connections.webhook.event";
import { StripeIdentityVerificationSessionsWebhookEvent } from "../events/identities.webhook.event";
import { StripeInvoiceItemsWebhookEvent } from "../events/invoice-items.webhook.event";
import { StripeInvoicesWebhookEvent } from "../events/invoices.webhook.event";
import { StripeIssuingAuthorizationsWebhookEvent } from "../events/issuing-authorizations.webhook.event";
import { StripeIssuingCardholdersWebhookEvent } from "../events/issuing-cardholders.webhook.event";
import { StripeIssuingCardsWebhookEvent } from "../events/issuing-cards.webhook.event";
import { StripeIssuingDisputesWebhookEvent } from "../events/issuing-disputes.webhook.event";
import { StripeIssuingTransactionsWebhookEvent } from "../events/issuing-transactions.webhook.event";
import { StripeMandatesWebhookEvent } from "../events/mandates.webhook.event";
import { StripeOrderReturnsWebhookEvent } from "../events/order-returns.webhook.event";
import { StripeOrdersWebhookEvent } from "../events/orders.webhook.event";
import { StripePaymentIntentsWebhookEvent } from "../events/payment-intents.webhook.event";
import { StripePaymentLinksWebhookEvent } from "../events/payment-links.webhook.event";
import { StripePaymentMethodsWebhookEvent } from "../events/payment-methods.webhook.event";
import { StripePayoutsWebhookEvent } from "../events/payouts.webhook.event";
import { StripePersonsWebhookEvent } from "../events/persons.webhook.event";
import { StripePlansWebhookEvent } from "../events/plans.webhook.event";
import { StripePricesWebhookEvent } from "../events/prices.webhook.event";
import { StripeProductsWebhookEvent } from "../events/products.webhook.event";
import { StripePromotionCodesWebhookEvent } from "../events/promotion-codes.webhook.event";
import { StripeQuotesWebhookEvent } from "../events/quotes.webhook.event";
import { StripeRadarEarlyFraudWarningWebhookEvent } from "../events/radar.webhook.event";
import { StripeRecipientsWebhookEvent } from "../events/recipients.webhook.event";
import { StripeReportingReportRunWebhookEvent, StripeReportingReportTypeWebhookEvent } from "../events/reporting.webhook.event";
import { StripeReviewsWebhookEvent } from "../events/reviews.webhook.event";
import { StripeSetupIntentsWebhookEvent } from "../events/setup-intents.webhook.event";
import { StripeSigmaScheduledQueryRunWebhookEvent } from "../events/sigma.webhook.event";
import { StripeSkuWebhookEvent } from "../events/sku.webhook.event";
import {
    StripeSourceMandateNotificationsWebhookEvent,
    StripeSourcesWebhookEvent,
    StripeSourceTransactionsWebhookEvent
} from "../events/sources.webhook.event";
import { StripeSubscriptionSchedulesWebhookEvent } from "../events/subscription-schedules.webhook.event";
import { StripeTaxRatesWebhookEvent } from "../events/tax-rates.webhook.event";
import { StripeTerminalReadersWebhookEvent } from "../events/terminals.webhook.event";
import { StripeTestHelpersTestClockWebhookEvent } from "../events/test-helpers.webhook.event";
import { StripeTopupsWebhookEvent } from "../events/topups.webhook.event";
import { StripeTransfersWebhookEvent } from "../events/transfers.webhook.event";

@Injectable()
export class StripeWebhookCqrsHandlerService extends StripeWebhookHandlerService implements OnModuleInit {
    // @ts-ignore
    private eventBus: NestJsCqrs.EventBus;

    constructor(private moduleRef: ModuleRef) {
        super();
    }

    public onModuleInit(): void {
        const { EventBus } = require("@nestjs/cqrs") as typeof NestJsCqrs;
        this.eventBus = this.moduleRef.get<NestJsCqrs.EventBus>(EventBus, { strict: false });
    }

    public async handleEvent(event: Stripe.Event): Promise<void> {
        const [resource, ...actions] = event.type.split(".");
        switch (resource) {
            case "account":
                return this.handleAccountsEvent(actions, event.data.object as Stripe.Account);
            case "application_fee":
                return this.handleApplicationFee(actions, event.data.object as Stripe.ApplicationFee);
            case "balance":
                return this.handleBalance(actions, event.data.object as Stripe.Balance);
            case "billing_portal":
                return this.handleBillingPortal(actions, event.data.object);
            case "capability":
                return this.handleCapability(actions, event.data.object as Stripe.Capability);
            case "charge":
                return this.handleCharge(actions, event.data.object);
            case "checkout":
                return this.handleCheckout(actions, event.data.object as Stripe.Checkout.Session);
            case "coupon":
                return this.handleCoupon(actions, event.data.object as Stripe.Coupon);
            case "credit_note":
                return this.handleCreditNote(actions, event.data.object as Stripe.CreditNote);
            case "customer":
                return this.handleCustomer(actions, event.data.object);
            case "file":
                return this.handleFile(actions, event.data.object as Stripe.File);
            case "financial_connections":
                return this.handleFinancialConnections(actions, event.data.object as Stripe.FinancialConnections.Account);
            case "identity":
                return this.handleVerificationSession(actions, event.data.object as Stripe.Identity.VerificationSession);
            case "invoice":
                return this.handleInvoice(actions, event.data.object as Stripe.Invoice);
            case "invoiceitem":
                return this.handleInvoiceItem(actions, event.data.object as Stripe.InvoiceItem);
            case "issuing_authorization":
                return this.handleIssuingAuthorization(actions, event.data.object as Stripe.Issuing.Authorization);
            case "issuing_card":
                return this.handleIssuingCard(actions, event.data.object as Stripe.Issuing.Card);
            case "issuing_cardholder":
                return this.handleIssuingCardholder(actions, event.data.object as Stripe.Issuing.Cardholder);
            case "issuing_dispute":
                return this.handleIssuingDispute(actions, event.data.object as Stripe.Issuing.Dispute);
            case "issuing_transaction":
                return this.handleIssuingTransaction(actions, event.data.object as Stripe.Issuing.Transaction);
            case "mandate":
                return this.handleMandate(actions, event.data.object as Stripe.Mandate);
            case "order":
                return this.handleOrder(actions, event.data.object as Stripe.Order);
            case "order_return":
                return this.handleOrderReturn(actions, event.data.object as Stripe.Order);
            case "payment_intent":
                return this.handlePaymentIntent(actions, event.data.object as Stripe.PaymentIntent);
            case "payment_link":
                return this.handlePaymentLink(actions, event.data.object as Stripe.PaymentLink);
            case "payment_method":
                return this.handlePaymentMethod(actions, event.data.object as Stripe.PaymentMethod);
            case "payout":
                return this.handlePayout(actions, event.data.object as Stripe.Payout);
            case "person":
                return this.handlePerson(actions, event.data.object as Stripe.Person);
            case "plan":
                return this.handlePlan(actions, event.data.object as Stripe.Plan);
            case "price":
                return this.handlePrice(actions, event.data.object as Stripe.Price);
            case "product":
                return this.handleProduct(actions, event.data.object as Stripe.Product);
            case "promotion_code":
                return this.handlePromotionCode(actions, event.data.object as Stripe.PromotionCode);
            case "quote":
                return this.handleQuote(actions, event.data.object as Stripe.Quote);
            case "radar":
                return this.handleRadar(actions, event.data.object as Stripe.Radar.EarlyFraudWarning);
            case "recipient":
                return this.handleRecipient(actions, event.data.object as Stripe.Recipient);
            case "reporting":
                return this.handleReporting(actions, event.data.object);
            case "review":
                return this.handleReview(actions, event.data.object as Stripe.Review);
            case "setup_intent":
                return this.handleSetupIntent(actions, event.data.object as Stripe.SetupIntent);
            case "sigma":
                return this.handleSigma(actions, event.data.object as Stripe.Sigma.ScheduledQueryRun);
            case "sku":
                return this.handleSku(actions, event.data.object as Stripe.Sku);
            case "source":
                return this.handleSource(actions, event.data.object);
            case "subscription_schedule":
                return this.handleSubscriptionSchedule(actions, event.data.object as Stripe.SubscriptionSchedule);
            case "tax_rate":
                return this.handleTaxRates(actions, event.data.object as Stripe.TaxRate);
            case "terminal":
                return this.handleTerminal(actions, event.data.object as Stripe.Terminal.Reader);
            case "test_helpers":
                return this.handleTestHelpers(actions, event.data.object as Stripe.TestHelpers.TestClock);
            case "topup":
                return this.handleTopup(actions, event.data.object as Stripe.Topup);
            case "transfer":
                return this.handleTransfer(actions, event.data.object as Stripe.Transfer);
        }
    }

    private handleAccountsEvent(actions: string[], data: Stripe.Account): void {
        this.eventBus.publish(new StripeAccountsWebhookEvent(actions.join("."), data));
    }

    private handleApplicationFee(actions: string[], data: Stripe.ApplicationFee): void {
        this.eventBus.publish(new StripeApplicationFeesWebhookEvent(actions.join("."), data));
    }

    private handleBalance(actions: string[], data: Stripe.Balance): void {
        this.eventBus.publish(new StripeBalancesWebhookEvent(actions.join("."), data));
    }

    private handleBillingPortal(actions: string[], data: Stripe.Event.Data.Object): void {
        const [type, action] = actions;
        if (type === "configuration") {
            this.eventBus.publish(new StripeBillingPortalConfigurationsWebhookEvent(action, data as Stripe.BillingPortal.Configuration));
        } else {
            this.eventBus.publish(new StripeBillingPortalSessionsWebhookEvent(action, data as Stripe.BillingPortal.Session));
        }
    }

    private handleCapability(actions: string[], data: Stripe.Capability): void {
        this.eventBus.publish(new StripeCapabilitiesWebhookEvent(actions.join("."), data));
    }

    private handleCharge(actions: string[], data: Stripe.Event.Data.Object): void {
        const [typeOrAction, action] = actions;
        if (!action) {
            this.eventBus.publish(new StripeChargesWebhookEvent(typeOrAction, data as Stripe.Charge));
        } else if (typeOrAction === "dispute") {
            this.eventBus.publish(new StripeChargeDisputesWebhookEvent(action, data as Stripe.Dispute));
        } else if (typeOrAction === "refund") {
            this.eventBus.publish(new StripeChargeRefundsWebhookEvent(action, data as Stripe.Refund));
        }
    }

    private handleCheckout(actions: string[], data: Stripe.Checkout.Session): void {
        this.eventBus.publish(new StripeCheckoutSessionsWebhookEvent(actions.join("."), data));
    }

    private handleCoupon(actions: string[], data: Stripe.Coupon): void {
        this.eventBus.publish(new StripeCouponsWebhookEvent(actions.join("."), data));
    }

    private handleCreditNote(actions: string[], data: Stripe.CreditNote): void {
        this.eventBus.publish(new StripeCreditNotesWebhookEvent(actions.join("."), data));
    }

    private handleCustomer(actions: string[], data: Stripe.Event.Data.Object): void {
        const [typeOrAction, action] = actions;
        if (!action) {
            this.eventBus.publish(new StripeCustomersWebhookEvent(typeOrAction, data as Stripe.Customer));
        } else if (typeOrAction === "discount") {
            this.eventBus.publish(new StripeCustomerDiscountsWebhookEvent(action, data as Stripe.Discount));
        } else if (typeOrAction === "source") {
            this.eventBus.publish(new StripeCustomerSourcesWebhookEvent(action, data as Stripe.Source));
        } else if (typeOrAction === "subscription") {
            this.eventBus.publish(new StripeCustomerSubscriptionsWebhookEvent(action, data as Stripe.Subscription));
        } else if (typeOrAction === "tax_id") {
            this.eventBus.publish(new StripeCustomerTaxIdWebhookEvent(action, data as Stripe.TaxId));
        }
    }

    private handleFile(actions: string[], data: Stripe.File): void {
        this.eventBus.publish(new StripeFilesWebhookEvent(actions.join("."), data));
    }

    private handleFinancialConnections(actions: string[], data: Stripe.FinancialConnections.Account): void {
        this.eventBus.publish(new StripeFinancialConnectionAccountsWebhookEvent(actions[1], data));
    }

    private handleVerificationSession(actions: string[], data: Stripe.Identity.VerificationSession): void {
        this.eventBus.publish(new StripeIdentityVerificationSessionsWebhookEvent(actions[1], data));
    }

    private handleInvoice(actions: string[], data: Stripe.Invoice): void {
        this.eventBus.publish(new StripeInvoicesWebhookEvent(actions[0], data));
    }

    private handleInvoiceItem(actions: string[], data: Stripe.InvoiceItem): void {
        this.eventBus.publish(new StripeInvoiceItemsWebhookEvent(actions[0], data));
    }

    private handleIssuingAuthorization(actions: string[], data: Stripe.Issuing.Authorization): void {
        this.eventBus.publish(new StripeIssuingAuthorizationsWebhookEvent(actions[0], data));
    }

    private handleIssuingCard(actions: string[], data: Stripe.Issuing.Card): void {
        this.eventBus.publish(new StripeIssuingCardsWebhookEvent(actions[0], data));
    }

    private handleIssuingCardholder(actions: string[], data: Stripe.Issuing.Cardholder): void {
        this.eventBus.publish(new StripeIssuingCardholdersWebhookEvent(actions[0], data));
    }

    private handleIssuingDispute(actions: string[], data: Stripe.Issuing.Dispute): void {
        this.eventBus.publish(new StripeIssuingDisputesWebhookEvent(actions[0], data));
    }

    private handleIssuingTransaction(actions: string[], data: Stripe.Issuing.Transaction): void {
        this.eventBus.publish(new StripeIssuingTransactionsWebhookEvent(actions[0], data));
    }

    private handleMandate(actions: string[], data: Stripe.Mandate): void {
        this.eventBus.publish(new StripeMandatesWebhookEvent(actions[0], data));
    }

    private handleOrder(actions: string[], data: Stripe.Order): void {
        this.eventBus.publish(new StripeOrdersWebhookEvent(actions[0], data));
    }

    private handleOrderReturn(actions: string[], data: Stripe.Order): void {
        this.eventBus.publish(new StripeOrderReturnsWebhookEvent(actions[0], data));
    }

    private handlePaymentIntent(actions: string[], data: Stripe.PaymentIntent): void {
        this.eventBus.publish(new StripePaymentIntentsWebhookEvent(actions[0], data));
    }

    private handlePaymentLink(actions: string[], data: Stripe.PaymentLink): void {
        this.eventBus.publish(new StripePaymentLinksWebhookEvent(actions[0], data));
    }

    private handlePaymentMethod(actions: string[], data: Stripe.PaymentMethod): void {
        this.eventBus.publish(new StripePaymentMethodsWebhookEvent(actions[0], data));
    }

    private handlePayout(actions: string[], data: Stripe.Payout): void {
        this.eventBus.publish(new StripePayoutsWebhookEvent(actions[0], data));
    }

    private handlePerson(actions: string[], data: Stripe.Person): void {
        this.eventBus.publish(new StripePersonsWebhookEvent(actions[0], data));
    }

    private handlePlan(actions: string[], data: Stripe.Plan): void {
        this.eventBus.publish(new StripePlansWebhookEvent(actions[0], data));
    }

    private handlePrice(actions: string[], data: Stripe.Price): void {
        this.eventBus.publish(new StripePricesWebhookEvent(actions[0], data));
    }

    private handleProduct(actions: string[], data: Stripe.Product): void {
        this.eventBus.publish(new StripeProductsWebhookEvent(actions[0], data));
    }

    private handlePromotionCode(actions: string[], data: Stripe.PromotionCode): void {
        this.eventBus.publish(new StripePromotionCodesWebhookEvent(actions[0], data));
    }

    private handleQuote(actions: string[], data: Stripe.Quote): void {
        this.eventBus.publish(new StripeQuotesWebhookEvent(actions[0], data));
    }

    private handleRadar(actions: string[], data: Stripe.Radar.EarlyFraudWarning): void {
        this.eventBus.publish(new StripeRadarEarlyFraudWarningWebhookEvent(actions[1], data));
    }

    private handleRecipient(actions: string[], data: Stripe.Recipient): void {
        this.eventBus.publish(new StripeRecipientsWebhookEvent(actions[0], data));
    }

    private handleReporting(actions: string[], data: Stripe.Event.Data.Object): void {
        const [type, action] = actions;
        if (type === "report_run") {
            this.eventBus.publish(new StripeReportingReportRunWebhookEvent(action, data as Stripe.Reporting.ReportRun));
        } else {
            this.eventBus.publish(new StripeReportingReportTypeWebhookEvent(action, data as Stripe.Reporting.ReportType));
        }
    }

    private handleReview(actions: string[], data: Stripe.Review): void {
        this.eventBus.publish(new StripeReviewsWebhookEvent(actions[0], data as Stripe.Review));
    }

    private handleSetupIntent(actions: string[], data: Stripe.SetupIntent): void {
        this.eventBus.publish(new StripeSetupIntentsWebhookEvent(actions[0], data as Stripe.SetupIntent));
    }

    private handleSigma(actions: string[], data: Stripe.Sigma.ScheduledQueryRun): void {
        this.eventBus.publish(new StripeSigmaScheduledQueryRunWebhookEvent(actions[1], data as Stripe.Sigma.ScheduledQueryRun));
    }

    private handleSku(actions: string[], data: Stripe.Sku): void {
        this.eventBus.publish(new StripeSkuWebhookEvent(actions[0], data as Stripe.Sku));
    }

    private handleSource(actions: string[], data: Stripe.Event.Data.Object): void {
        const [typeOrAction, action] = actions;
        if (typeOrAction === "mandate_notification") {
            this.eventBus.publish(new StripeSourceMandateNotificationsWebhookEvent(typeOrAction, data as Stripe.SourceMandateNotification));
        } else if (typeOrAction === "transaction") {
            this.eventBus.publish(new StripeSourceTransactionsWebhookEvent(action, data as Stripe.SourceTransaction));
        } else {
            this.eventBus.publish(new StripeSourcesWebhookEvent(typeOrAction, data as Stripe.Source));
        }
    }

    private handleSubscriptionSchedule(actions: string[], data: Stripe.SubscriptionSchedule): void {
        this.eventBus.publish(new StripeSubscriptionSchedulesWebhookEvent(actions[0], data as Stripe.SubscriptionSchedule));
    }

    private handleTaxRates(actions: string[], data: Stripe.TaxRate): void {
        this.eventBus.publish(new StripeTaxRatesWebhookEvent(actions[0], data as Stripe.TaxRate));
    }

    private handleTerminal(actions: string[], data: Stripe.Terminal.Reader): void {
        this.eventBus.publish(new StripeTerminalReadersWebhookEvent(actions[1], data as Stripe.Terminal.Reader));
    }

    private handleTestHelpers(actions: string[], data: Stripe.TestHelpers.TestClock): void {
        this.eventBus.publish(new StripeTestHelpersTestClockWebhookEvent(actions[1], data as Stripe.TestHelpers.TestClock));
    }

    private handleTopup(actions: string[], data: Stripe.Topup): void {
        this.eventBus.publish(new StripeTopupsWebhookEvent(actions[0], data as Stripe.Topup));
    }

    private handleTransfer(actions: string[], data: Stripe.Transfer): void {
        this.eventBus.publish(new StripeTransfersWebhookEvent(actions[0], data as Stripe.Transfer));
    }
}
