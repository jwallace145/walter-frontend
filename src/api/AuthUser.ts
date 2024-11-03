import axios, { AxiosResponse } from 'axios';

export class AuthUserResponse {
  private readonly status: string;
  private readonly message: string;
  private readonly token: string;

  constructor(status: string, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.token = this.parseData(data);
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
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
