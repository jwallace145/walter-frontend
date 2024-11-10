import { getCookie } from 'typescript-cookie';
import { getPortfolio, GetPortfolioResponse } from './GetPortfolio';
import { getPrices, GetPricesResponse } from './GetPrices';
import { addStock, AddStockResponse } from './AddStock';
import { authUser, AuthUserResponse } from './AuthUser';
import { createUser, CreateUserResponse } from './CreateUser';
import { sendNewsletter, SendNewsletterResponse } from './SendNewsletter';
import { getUser, GetUserResponse } from './GetUser';
import { deleteStock, DeleteStockResponse } from './DeleteStock';

/**
 * Walter API
 *
 * The APIs available to WalterFrontend via the Walter API.
 */
export class WalterAPI {
  private static readonly ENDPOINT: string = process.env
    .REACT_APP_WALTER_API_ENDPOINT as string;

  /**
   * Authenticate the user with email and password.
   *
   * @param email
   * @param password
   */
  public static async authUser(
    email: string,
    password: string,
  ): Promise<AuthUserResponse> {
    return authUser(WalterAPI.ENDPOINT, email, password);
  }

  /**
   * Create user with email, username, and password.
   *
   * @param email
   * @param username
   * @param password
   */
  public static async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<CreateUserResponse> {
    return createUser(WalterAPI.ENDPOINT, email, username, password);
  }

  /**
   * Get the current user from the Walter token.
   */
  public static async getUser(): Promise<GetUserResponse> {
    const token: string = getCookie('WalterToken') as string;
    return getUser(WalterAPI.ENDPOINT, token);
  }

  /**
   * Add a stock and quantity to a user portfolio.
   *
   * @param stock
   * @param quantity
   */
  public static async addStock(
    stock: string,
    quantity: number,
  ): Promise<AddStockResponse> {
    const token: string = getCookie('WalterToken') as string;
    return addStock(WalterAPI.ENDPOINT, token, stock, quantity);
  }

  /**
   * Delete a stock from a user portfolio.
   *
   * @param stock
   */
  public static async deleteStock(stock: string): Promise<DeleteStockResponse> {
    const token: string = getCookie('WalterToken') as string;
    return deleteStock(WalterAPI.ENDPOINT, token, stock);
  }

  /**
   * Get the latest prices for a stock.
   *
   * @param stock
   */
  public static async getPrices(stock: string): Promise<GetPricesResponse> {
    return getPrices(WalterAPI.ENDPOINT, stock);
  }

  /**
   * Get the user's current portfolio.
   */
  public static async getPortfolio(): Promise<GetPortfolioResponse> {
    const token: string = getCookie('WalterToken') as string;
    return getPortfolio(WalterAPI.ENDPOINT, token);
  }

  /**
   * Send a newsletter to the current user.
   */
  public static async sendNewsletter(): Promise<SendNewsletterResponse> {
    const token: string = getCookie('WalterToken') as string;
    return sendNewsletter(WalterAPI.ENDPOINT, token);
  }
}
