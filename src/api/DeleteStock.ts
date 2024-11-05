import axios, { AxiosResponse } from 'axios';

export class DeleteStockResponse {
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

export async function deleteStock(
  endpoint: string,
  token: string,
  stock: string,
): Promise<DeleteStockResponse> {
  const response: AxiosResponse = await axios({
    method: 'DELETE',
    url: `${endpoint}/stocks`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      stock: stock,
    },
  });
  return new DeleteStockResponse(
    response.data['Status'],
    response.data['Message'],
  );
}
