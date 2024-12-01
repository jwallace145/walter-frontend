import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { UNSUBSCRIBE_METHOD } from '../common/Methods';

/**
 * UnsubscribeResponse
 *
 * The unsubscribe response object for the UnsubscribeButton API to unsubscribe
 * users from Walter's newsletter.
 */
export class UnsubscribeResponse extends WalterAPIResponseBase {}

/**
 * UnsubscribeButton API
 *
 * This method unsubscribes the user from Walter's newsletter.
 *
 * @param endpoint The endpoint of the API.
 * @param token    The identity token of the verified user.
 */
export async function unsubscribe(
  endpoint: string,
  token: string,
): Promise<UnsubscribeResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/unsubscribe`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new UnsubscribeResponse(
    UNSUBSCRIBE_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
