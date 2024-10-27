import axios, { AxiosResponse } from 'axios';

export class GetPortfolioResponse {
  private readonly status: string;
  private readonly message: string;
  private readonly portfolio: Portfolio;

  constructor(status: string, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.portfolio = this.setPortfolio(data);
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }

  public getPortfolio(): Portfolio {
    return this.portfolio;
  }

  public getTotalEquity(): number {
    return this.portfolio.totalEquity;
  }

  public getStocks(): PortfolioStock[] {
    return this.portfolio.stocks;
  }

  private setPortfolio(data: any): Portfolio {
    if (data === null) {
      return {
        totalEquity: 0,
        stocks: [],
      };
    }
    return {
      totalEquity: data['total_equity'],
      stocks: data['stocks'],
    };
  }
}

export interface Portfolio {
  totalEquity: number;
  stocks: PortfolioStock[];
}

export interface PortfolioStock {
  symbol: string;
  quantity: number;
  price: number;
  equity: number;
}

export async function getPortfolio(
  endpoint: string,
  token: string,
): Promise<GetPortfolioResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/portfolios`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new GetPortfolioResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
