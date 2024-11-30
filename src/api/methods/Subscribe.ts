import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { SUBSCRIBE_METHOD } from '../../constants/Constants';

/**
 * SubscribeResponse
 *
 * The response object for the Subscribe API to subscribe users to Walter's
 * newsletter.
 */
export class SubscribeResponse extends WalterAPIResponseBase {}

/**
 * Subscribe API
 *
 * This method subscribes the user to Walter's newsletter.
 *
 * @param endpoint The endpoint of the API.
 * @param token    The identity token of the verified user.
 */
export async function subscribe(
  endpoint: string,
  token: string,
): Promise<SubscribeResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/subscribe`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new SubscribeResponse(
    SUBSCRIBE_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
