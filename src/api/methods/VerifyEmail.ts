import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { VERIFY_EMAIL_METHOD } from '../common/Methods';

/**
 * VerifyEmailResponse
 *
 * The response object for VerifyEmail API to verify user ownership of
 * email address.
 */
export class VerifyEmailResponse extends WalterAPIResponseBase {}

export async function verifyEmail(
  endpoint: string,
  token: string,
): Promise<VerifyEmailResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/verify`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new VerifyEmailResponse(
    VERIFY_EMAIL_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
