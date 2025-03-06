import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_USER_METHOD } from '../common/Methods';

/**
 * User
 *
 * The model object for a user.
 */
export interface User {
  email: string;
  username: string;
  verified: boolean;
  subscribed: boolean;
  signUpDate: Date;
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

  public getUser(): User {
    return this.user;
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

  public isNotSubscribed(): boolean {
    console.log(this.user);
    return !this.user.subscribed && this.isAuthenticated();
  }

  public getMessage(): string {
    return this.message;
  }

  private initUser(data?: any): User {
    console.log(data);
    if (data === null || data === undefined) {
      return {
        email: '',
        username: '',
        verified: false,
        subscribed: false,
        signUpDate: new Date(),
      };
    }
    return {
      email: data.email,
      username: data.username,
      verified: data.verified,
      subscribed: data.subscribed,
      signUpDate: new Date(data['sign_up_date']),
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
