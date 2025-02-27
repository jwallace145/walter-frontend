import { getCookie } from 'typescript-cookie';
import { getPortfolio, GetPortfolioResponse } from './methods/GetPortfolio';
import { getPrices, GetPricesResponse } from './methods/GetPrices';
import { addStock, AddStockResponse } from './methods/AddStock';
import { authUser, AuthUserResponse } from './methods/AuthUser';
import { createUser, CreateUserResponse } from './methods/CreateUser';
import {
  sendNewsletter,
  SendNewsletterResponse,
} from './methods/SendNewsletter';
import { getUser, GetUserResponse } from './methods/GetUser';
import { deleteStock, DeleteStockResponse } from './methods/DeleteStock';
import { verifyEmail, VerifyEmailResponse } from './methods/VerifyEmail';
import {
  changePassword,
  ChangePasswordResponse,
} from './methods/ChangePassword';
import {
  sendChangePasswordEmail,
  SendChangePasswordEmailResponse,
} from './methods/SendChangePasswordEmail';
import { getStock, GetStockResponse } from './methods/GetStock';
import {
  sendVerifyEmail,
  SendVerifyEmailResponse,
} from './methods/SendVerifyEmail';
import { subscribe, SubscribeResponse } from './methods/Subscribe';
import { unsubscribe, UnsubscribeResponse } from './methods/Unsubscribe';
import {
  getNewsSummary,
  GetNewsSummaryResponse,
} from './methods/GetNewsSummary';
import { searchStocks, SearchStocksResponse } from './methods/SearchStocks';
import {
  purchaseNewsletterSubscription,
  PurchaseNewsletterSubscriptionResponse,
} from './methods/PurchaseNewsletterSubscription';
import {
  verifyPurchaseNewsletterSubscription,
  VerifyPurchaseNewsletterSubscriptionResponse,
} from './methods/VerifyPurchaseNewsletterSubscription';
import { WALTER_TOKEN_NAME } from '../constants/Constants';

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
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return getUser(WalterAPI.ENDPOINT, token);
  }

  /**
   * Get a stock and its details from WalterDB.
   *
   * @param symbol The symbol of the stock to query.
   */
  public static async getStock(symbol: string): Promise<GetStockResponse> {
    return getStock(WalterAPI.ENDPOINT, symbol);
  }

  /**
   * Get AI news summary of articles related to the given stock
   *
   * @param symbol The symbol of the stock.
   */
  public static async getNewsSummary(
    symbol: string,
  ): Promise<GetNewsSummaryResponse> {
    return getNewsSummary(WalterAPI.ENDPOINT, symbol);
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
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return addStock(WalterAPI.ENDPOINT, token, stock, quantity);
  }

  /**
   * Delete a stock from a user portfolio.
   *
   * @param stock
   */
  public static async deleteStock(stock: string): Promise<DeleteStockResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
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
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return getPortfolio(WalterAPI.ENDPOINT, token);
  }

  /**
   * Send a newsletter to the current user.
   */
  public static async sendNewsletter(): Promise<SendNewsletterResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return sendNewsletter(WalterAPI.ENDPOINT, token);
  }

  /**
   * Send verify user email to user's email address.
   */
  public static async sendVerifyEmail(): Promise<SendVerifyEmailResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return sendVerifyEmail(WalterAPI.ENDPOINT, token);
  }

  /**
   * Verify user ownership of email address.
   */
  public static async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    return verifyEmail(WalterAPI.ENDPOINT, token);
  }

  /**
   * Reset the user's password.
   *
   * @param token
   * @param newPassword
   */
  public static async changePassword(
    token: string,
    newPassword: string,
  ): Promise<ChangePasswordResponse> {
    return changePassword(WalterAPI.ENDPOINT, token, newPassword);
  }

  /**
   * Send a reset password email to the user.
   *
   * @param email
   */
  public static async sendChangePasswordEmail(
    email: string,
  ): Promise<SendChangePasswordEmailResponse> {
    return sendChangePasswordEmail(WalterAPI.ENDPOINT, email);
  }

  /**
   * SubscribeButton the authenticated user to Walter's newsletter.
   */
  public static async subscribe(): Promise<SubscribeResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return subscribe(WalterAPI.ENDPOINT, token);
  }

  /**
   * UnsubscribeButton the user with the given token from Walter's newsletter.
   */
  public static async unsubscribeUser(
    token: string,
  ): Promise<UnsubscribeResponse> {
    return unsubscribe(WalterAPI.ENDPOINT, token);
  }

  /**
   * UnsubscribeButton the current authenticated user from Walter's newsletter.
   */
  public static async unsubscribe(): Promise<UnsubscribeResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return unsubscribe(WalterAPI.ENDPOINT, token);
  }

  /**
   * Search for stocks similar to the given symbol.
   */
  public static async searchStocks(
    symbol: string,
  ): Promise<SearchStocksResponse> {
    return searchStocks(WalterAPI.ENDPOINT, symbol);
  }

  /**
   * Create a Stripe checkout session to redirect the user to purchase a
   * newsletter subscription.
   */
  public static async purchaseNewsletterSubscription(): Promise<PurchaseNewsletterSubscriptionResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return purchaseNewsletterSubscription(WalterAPI.ENDPOINT, token);
  }

  public static async verifyPurchaseNewsletterSubscription(
    stripeSessionId: string,
  ): Promise<VerifyPurchaseNewsletterSubscriptionResponse> {
    const token: string = getCookie(WALTER_TOKEN_NAME) as string;
    return verifyPurchaseNewsletterSubscription(
      WalterAPI.ENDPOINT,
      token,
      stripeSessionId,
    );
  }
}
