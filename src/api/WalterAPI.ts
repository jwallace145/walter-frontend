import { getCookie } from 'typescript-cookie';
import { getPortfolio, GetPortfolioResponse } from './GetPortfolio';
import { getPrices, GetPricesResponse } from './GetPrices';
import { addStocks, AddStocksResponse } from './AddStocks';
import { authUser, AuthUserResponse } from './AuthUser';
import { createUser, CreateUserResponse } from './CreateUser';
import { sendNewsletter, SendNewsletterResponse } from './SendNewsletter';
import { getUser, GetUserResponse } from './GetUser';
import { deleteStock, DeleteStockResponse } from './DeleteStock';

export class WalterAPI {
  private static readonly ENDPOINT: string = process.env
    .REACT_APP_WALTER_API_ENDPOINT as string;

  public static async authUser(
    email: string,
    password: string,
  ): Promise<AuthUserResponse> {
    return authUser(WalterAPI.ENDPOINT, email, password);
  }

  public static async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<CreateUserResponse> {
    return createUser(WalterAPI.ENDPOINT, email, username, password);
  }

  public static async getUser(): Promise<GetUserResponse> {
    const token: string = getCookie('WalterToken') as string;
    return getUser(WalterAPI.ENDPOINT, token);
  }

  public static async addStock(
    stock: string,
    quantity: number,
  ): Promise<AddStocksResponse> {
    const token: string = getCookie('WalterToken') as string;
    return addStocks(WalterAPI.ENDPOINT, token, stock, quantity);
  }

  public static async deleteStock(stock: string): Promise<DeleteStockResponse> {
    const token: string = getCookie('WalterToken') as string;
    return deleteStock(WalterAPI.ENDPOINT, token, stock);
  }

  public static async getPrices(stock: string): Promise<GetPricesResponse> {
    return getPrices(WalterAPI.ENDPOINT, stock);
  }

  public static async getPortfolio(): Promise<GetPortfolioResponse> {
    const token: string = getCookie('WalterToken') as string;
    return getPortfolio(WalterAPI.ENDPOINT, token);
  }

  public static async sendNewsletter(): Promise<SendNewsletterResponse> {
    const token: string = getCookie('WalterToken') as string;
    return sendNewsletter(WalterAPI.ENDPOINT, token);
  }
}
