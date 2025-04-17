import { WalterAPIResponseBase } from '../common/Response';
import { GET_NEWSLETTERS_METHOD } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export interface Newsletter {
  title: string;
  date: string;
  model: string;
  template: string;
}

export class GetNewslettersResponse extends WalterAPIResponseBase {
  private readonly currentPage: number;
  private readonly lastPage: number;
  private readonly newsletters: Newsletter[];

  constructor(status: string, message: string, data?: any) {
    super(GET_NEWSLETTERS_METHOD, status, message);
    this.currentPage = data?.current_page;
    this.lastPage = data?.last_page;
    this.newsletters = this.parseData(data);
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getLastPage(): number {
    return this.lastPage;
  }

  public getNewsletters(): Newsletter[] {
    return this.newsletters;
  }

  private parseData(data: any): Newsletter[] {
    if (data === null || data === undefined) {
      return [];
    }
    return data.newsletters.map((newsletter: any): Newsletter => {
      return {
        title: newsletter['title'],
        date: newsletter['date'],
        model: newsletter['model'],
        template: newsletter['model'],
      };
    });
  }
}

export async function getNewsletters(
  endpoint: string,
  token: string,
  page: number,
): Promise<GetNewslettersResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/newsletters`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
    },
  });
  return new GetNewslettersResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
