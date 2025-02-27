import { WalterAPIResponseBase } from '../common/Response';
import { VERIFY_PURCHASE_NEWSLETTER_SUBSCRIPTION_METHOD } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export class VerifyPurchaseNewsletterSubscriptionResponse extends WalterAPIResponseBase {
  private readonly customerEmail: string;
  private readonly stripeCustomerId: string;
  private readonly stripeSubscriptionId: string;

  constructor(status: string, message: string, data?: any) {
    super(VERIFY_PURCHASE_NEWSLETTER_SUBSCRIPTION_METHOD, status, message);
    this.customerEmail = data?.['customer_email'] ?? '';
    this.stripeCustomerId = data?.['stripe_customer_id'] ?? '';
    this.stripeSubscriptionId = data?.['stripe_subscription_id'] ?? '';
  }

  public getCustomerEmail(): string {
    return this.customerEmail;
  }

  public getStripeCustomerId(): string {
    return this.stripeCustomerId;
  }

  public getStripeSubscriptionId(): string {
    return this.stripeSubscriptionId;
  }
}

export async function verifyPurchaseNewsletterSubscription(
  endpoint: string,
  token: string,
  stripeSessionId: string,
): Promise<VerifyPurchaseNewsletterSubscriptionResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/purchase/verify?sessionId=${stripeSessionId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new VerifyPurchaseNewsletterSubscriptionResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
