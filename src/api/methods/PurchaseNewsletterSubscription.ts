import { WalterAPIResponseBase } from '../common/Response';
import { PURCHASE_NEWSLETTER_SUBSCRIPTION_METHOD } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export class PurchaseNewsletterSubscriptionResponse extends WalterAPIResponseBase {
  private readonly checkoutSessionId: string;
  private readonly checkoutUrl: string;

  constructor(status: string, message: string, data?: any) {
    super(PURCHASE_NEWSLETTER_SUBSCRIPTION_METHOD, status, message);
    this.checkoutSessionId = this.getCheckoutSessionIdFromData(data);
    this.checkoutUrl = this.getCheckoutUrlFromData(data);
  }

  public getCheckoutSessionId(): string {
    return this.checkoutSessionId;
  }

  public getCheckoutUrl(): string {
    return this.checkoutUrl;
  }

  private getCheckoutSessionIdFromData(data: any): string {
    if (data === null || data === undefined) {
      return '';
    }
    return data['stripe_checkout_session_id'];
  }

  private getCheckoutUrlFromData(data: any): string {
    if (data == null || data === undefined) {
      return '';
    }
    return data['stripe_checkout_url'];
  }
}

export async function purchaseNewsletterSubscription(
  endpoint: string,
  token: string,
): Promise<PurchaseNewsletterSubscriptionResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/purchase`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new PurchaseNewsletterSubscriptionResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
