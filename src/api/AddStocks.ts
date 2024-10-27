import axios, { AxiosResponse } from 'axios';

export class AddStocksResponse {
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

export async function addStocks(
  endpoint: string,
  token: string,
  stock: string,
  quantity: number,
): Promise<AddStocksResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/stocks`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      stock: stock,
      quantity: quantity,
    },
  });
  return new AddStocksResponse(
    response.data['Status'],
    response.data['Message'],
  );
}
