import axios, { AxiosResponse } from 'axios';

export class GetUserResponse {
  private readonly status: string;
  private readonly message: string;
  private readonly user: User;

  constructor(status: string, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.user = this.initUser(data);
  }

  public isAuthenticated(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }

  public getUser(): User {
    return this.user;
  }

  private initUser(data?: any): User {
    if (data === null || data === undefined) {
      return {
        email: '',
        username: '',
      };
    }
    return {
      email: data.email,
      username: data.username,
    };
  }
}

export interface User {
  email: string;
  username: string;
}

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
