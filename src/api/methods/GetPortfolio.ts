import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_PORTFOLIO_METHOD } from '../common/Methods';

/**
 * Portfolio
 */
export interface Portfolio {
  totalEquity: number;
  stocks: PortfolioStock[];
}

/**
 * PortfolioStock
 */
export interface PortfolioStock {
  symbol: string;
  company: string;
  quantity: number;
  price: number;
  equity: number;
}

/**
 * GetPortfolioResponse
 *
 * The response object for the GetPortfolio API.
 */
export class GetPortfolioResponse extends WalterAPIResponseBase {
  private readonly portfolio: Portfolio;

  constructor(status: string, message: string, data?: any) {
    super(GET_PORTFOLIO_METHOD, status, message);
    this.portfolio = this.setPortfolio(data);
  }

  public getStocks(): PortfolioStock[] {
    return this.portfolio.stocks;
  }

  public getTotalEquity(): number {
    return this.portfolio.totalEquity;
  }

  private setPortfolio(data: any): Portfolio {
    if (data === null || data === undefined || !this.isSuccess()) {
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

/**
 * Get the user's portfolio via the GetPortfolio API.
 *
 * @param endpoint
 * @param token
 */
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
