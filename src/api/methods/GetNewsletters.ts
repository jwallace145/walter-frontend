import { WalterAPIResponseBase } from '../common/Response';
import { GET_NEWSLETTERS_METHOD } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export interface Newsletter {
  key: string;
  datestamp: string;
  template: string;
}

export class GetNewslettersResponse extends WalterAPIResponseBase {
  private readonly newsletters: Newsletter[];

  constructor(status: string, message: string, data?: any) {
    super(GET_NEWSLETTERS_METHOD, status, message);
    this.newsletters = this.parseData(data);
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
        key: newsletter['newsletter_key'],
        datestamp: newsletter['datestamp'],
        template: newsletter['template'],
      };
    });
  }
}

export async function getNewsletters(
  endpoint: string,
  token: string,
): Promise<GetNewslettersResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/newsletters`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new GetNewslettersResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
