import axios, { AxiosResponse } from 'axios';
import { PortfolioStock } from './GetPortfolio';

export class GetUserResponse {
  private readonly status: string;
  private readonly message: string;

  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }
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
  return new GetUserResponse(response.data['Status'], response.data['Message']);
}
