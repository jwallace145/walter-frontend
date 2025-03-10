import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { SEND_VERIFY_EMAIL_METHOD } from '../common/Methods';

/**
 * SendVerifyEmailResponse
 *
 * The response object for the SendVerifyEmail API.
 */
export class SendVerifyEmailResponse extends WalterAPIResponseBase {}

/**
 * SendVerifyEmail API
 *
 * The SendVerifyEmail API sends an email to an unverified user's email address
 * with a token given in an included link that the user can click to verify
 * ownership of the email address and subscribe to Walter's newsletter.
 *
 * @param endpoint
 * @param token
 */
export async function sendVerifyEmail(
  endpoint: string,
  token: string,
): Promise<SendVerifyEmailResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/verify`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new SendVerifyEmailResponse(
    SEND_VERIFY_EMAIL_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
