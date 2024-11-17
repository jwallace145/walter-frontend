import { WalterAPIResponseBase } from './Response';
import axios, { AxiosResponse } from 'axios';
import { SEND_CHANGE_PASSWORD_EMAIL_METHOD } from '../constants/Constants';
import { ChangePasswordResponse } from './ChangePassword';

/**
 * SendChangePasswordEmailResponse
 *
 * The response object returned for the SendChangePasswordEmail API.
 */
export class SendChangePasswordEmailResponse extends WalterAPIResponseBase {}

export async function sendChangePasswordEmail(
  endpoint: string,
  email: string,
): Promise<SendChangePasswordEmailResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/passwords`,
    params: {
      email: email,
    },
  });
  return new ChangePasswordResponse(
    SEND_CHANGE_PASSWORD_EMAIL_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
