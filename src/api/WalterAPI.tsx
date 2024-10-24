import axios, { AxiosResponse } from 'axios';

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
  private static readonly ENDPOINT: string =
    'https://084slq55lk.execute-api.us-east-1.amazonaws.com/dev';

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
    token: string,
    email: string,
    stock: string,
    quantity: number,
  ): Promise<Response> {
    const response: AxiosResponse = await axios({
      method: 'POST',
      url: `${WalterAPI.ENDPOINT}/stocks`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        stock: stock,
        quantity: quantity,
      },
    });
    return new Response(response.data['Status'], response.data['Message']);
  }

  public static async getPortfolio(
    token: string,
    email: string,
  ): Promise<Response> {
    const response: AxiosResponse = await axios({
      method: 'POST',
      url: `${WalterAPI.ENDPOINT}/portfolios`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
      },
    });
    return new Response(
      response.data['Status'],
      response.data['Message'],
      response.data['Data'],
    );
  }
}
