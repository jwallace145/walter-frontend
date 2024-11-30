import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_USER_METHOD } from '../../constants/Constants';

/**
 * User
 *
 * The model object for a user.
 */
export interface User {
  email: string;
  username: string;
  verified: boolean;
}

/**
 * GetUserResponse
 *
 * The response object for the GetUser API to get the current user via the
 * given Walter token.
 */
export class GetUserResponse extends WalterAPIResponseBase {
  private readonly user: User;

  constructor(status: string, message: string, data?: any) {
    super(GET_USER_METHOD, status, message);
    this.user = this.initUser(data);
  }

  public isAuthenticated(): boolean {
    return this.isSuccess();
  }

  /**
   * If the user exists (i.e. is authenticated) and the user's provided
   * email address has not been verified, then the user is not verified.
   * This impl ensures if the user simply does not exist this method
   * doesn't return true.
   */
  public isNotVerified(): boolean {
    return !this.user.verified && this.isAuthenticated();
  }

  public getMessage(): string {
    return this.message;
  }

  private initUser(data?: any): User {
    if (data === null || data === undefined) {
      return {
        email: '',
        username: '',
        verified: false,
      };
    }
    return {
      email: data.email,
      username: data.username,
      verified: data.verified,
    };
  }
}

/**
 * Get the current user via the GetUser API.
 *
 * @param endpoint
 * @param token
 */
export async function getUser(
  endpoint: string,
  token: string,
): Promise<GetUserResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new GetUserResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
