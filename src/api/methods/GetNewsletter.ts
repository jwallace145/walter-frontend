import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { GET_NEWSLETTER_METHOD } from '../common/Methods';

export class GetNewsletterResponse extends WalterAPIResponseBase {
  private readonly newsletter: string;

  constructor(status: string, message: string, data?: any) {
    super(GET_NEWSLETTER_METHOD, status, message);
    this.newsletter = this.parseData(data);
  }

  public getNewsletter(): string {
    return this.newsletter;
  }

  private parseData(data: any): string {
    if (data === null || data === undefined) {
      return '';
    }
    return data.newsletter;
  }
}

export async function getNewsletter(
  endpoint: string,
  token: string,
  date: string,
): Promise<GetNewsletterResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/newsletters/archive?date=${date}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new GetNewsletterResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
