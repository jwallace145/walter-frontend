import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { SEND_NEWSLETTER_METHOD } from '../../constants/Constants';

/**
 * SendNewsletterResponse
 *
 * The response object for the SendNewsletter API.
 */
export class SendNewsletterResponse extends WalterAPIResponseBase {}

/**
 * Send a newsletter to the user via the SendNewsletter API.
 *
 * @param endpoint
 * @param token
 */
export async function sendNewsletter(
  endpoint: string,
  token: string,
): Promise<SendNewsletterResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/newsletters`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new SendNewsletterResponse(
    SEND_NEWSLETTER_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
