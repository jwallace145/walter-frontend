import axios, { AxiosResponse } from 'axios';
import { getCookie } from 'typescript-cookie';
import { getPortfolio, GetPortfolioResponse } from './GetPortfolio';
import { GetPricesResponse, getPrices } from './GetPrices';

export class Response {
  private readonly status: string;
  private readonly message: string;
  private readonly data: any;

  constructor(status: string, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }

  public getData(): any {
    return this.data;
  }
}

export class WalterAPI {
  private static readonly ENDPOINT: string = process.env
    .REACT_APP_WALTER_API_ENDPOINT as string;

  public static async authUser(
    email: string,
    password: string,
  ): Promise<Response> {
    const response: AxiosResponse = await axios.post(
      `${WalterAPI.ENDPOINT}/auth`,
      {
        email: email,
        password: password,
      },
    );
    return new Response(
      response.data['Status'],
      response.data['Message'],
      response.data['Data'],
    );
  }

  public static async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<Response> {
    const response: AxiosResponse = await axios.post(
      `${WalterAPI.ENDPOINT}/users`,
      {
        email: email,
        username: username,
        password: password,
      },
    );
    return new Response(response.data['Status'], response.data['Message']);
  }

  public static async addStock(
    stock: string,
    quantity: number,
  ): Promise<Response> {
    const token: string = getCookie('WalterToken') as string;
    const response: AxiosResponse = await axios({
      method: 'POST',
      url: `${WalterAPI.ENDPOINT}/stocks`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        stock: stock,
        quantity: quantity,
      },
    });
    return new Response(response.data['Status'], response.data['Message']);
  }

  public static async getPrices(stock: string): Promise<GetPricesResponse> {
    return getPrices(WalterAPI.ENDPOINT, stock);
  }

  public static async getPortfolio(): Promise<GetPortfolioResponse> {
    const token: string = getCookie('WalterToken') as string;
    return getPortfolio(WalterAPI.ENDPOINT, token);
  }
}
