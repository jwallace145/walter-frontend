import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { AUTH_USER_METHOD, VERIFY_EMAIL_METHOD } from '../common/Methods';

/**
 * VerifyEmailResponse
 *
 * The response object for VerifyEmailButton API to verify user ownership of
 * email address.
 */
export class VerifyEmailResponse extends WalterAPIResponseBase {
  private readonly token: string;

  constructor(status: string, message: string, data?: any) {
    super(VERIFY_EMAIL_METHOD, status, message);
    this.token = this.parseData(data);
  }

  public getToken(): string {
    return this.token;
  }

  private parseData(data: any): string {
    if (data === null || data === undefined) {
      return '';
    }
    return data['token'];
  }
}

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
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
