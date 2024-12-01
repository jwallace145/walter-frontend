import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { AUTH_USER_METHOD } from '../common/Methods';

/**
 * AuthUserResponse
 *
 * The response object from the AuthUser API which grants users tokens
 * on successful authentication requests to the backend.
 */
export class AuthUserResponse extends WalterAPIResponseBase {
  private readonly token: string;

  constructor(status: string, message: string, data?: any) {
    super(AUTH_USER_METHOD, status, message);
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

/**
 * Authenticate the user via the AuthUser API.
 *
 * @param endpoint
 * @param email
 * @param password
 */
export async function authUser(
  endpoint: string,
  email: string,
  password: string,
): Promise<AuthUserResponse> {
  const response: AxiosResponse = await axios.post(`${endpoint}/auth`, {
    email: email,
    password: password,
  });
  return new AuthUserResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
