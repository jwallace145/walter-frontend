import axios, { AxiosResponse } from 'axios';

export class GetPricesResponse {
  private readonly status: string;
  private readonly message: string;
  private readonly prices: Price[];

  constructor(status: string, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.prices = this.parseData(data);
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }

  public getPrices(): Price[] {
    return this.prices;
  }

  private parseData(data: any): Price[] {
    if (data === undefined) {
      return [];
    }
    return data.prices;
  }
}

export interface Price {
  symbol: string;
  price: number;
  timestamp: string;
}

export async function getPrices(
  endpoint: string,
  stock: string,
): Promise<GetPricesResponse> {
  const response: AxiosResponse = await axios.post(`${endpoint}/prices`, {
    stock: stock,
  });
  return new GetPricesResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
