import { WalterAPIResponseBase } from '../common/Response';
import { GET_NEWS_SUMMARY_METHOD } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export interface NewsSource {
  title: string;
  url: string;
  published_timestamp: string;
  authors: string[];
  source: string;
  summary: string;
}

/**
 * GetNewsSummaryResponse
 *
 * The response model object for the WalterAPI GetNewsSummary. This API
 * parses the latest, relevant news articles to create a summary of news
 * related to the given stock. This API aims to give users AI summaries
 * of market movements related to specific companies.
 */
export class GetNewsSummaryResponse extends WalterAPIResponseBase {
  private readonly summary: string | undefined;
  private readonly sources: NewsSource[] | undefined;

  constructor(status: string, message: string, data?: any) {
    super(GET_NEWS_SUMMARY_METHOD, status, message);
    this.summary = this.getSummaryFromData(data);
    this.sources = this.getSourcesFromData(data);
  }

  getSummary(): string | undefined {
    return this.summary;
  }

  getSources(): NewsSource[] {
    if (this.sources === undefined) {
      return [];
    }
    return this.sources;
  }

  private parseData(data: any): string | undefined {
    if (data === undefined) {
      return data;
    }
    return data.summary;
  }

  private getSummaryFromData(data: any): string | undefined {
    if (data === undefined) {
      return data;
    }
    return data.summary;
  }

  private getSourcesFromData(data: any): NewsSource[] | undefined {
    if (data === undefined) {
      return data;
    }
    return data.articles;
  }
}

/**
 * Invoke the GetNewsSummary API to get a summary of news related to the given
 * stock.
 *
 * @param endpoint The GetNewsSummary API endpoint.
 * @param symbol   The symbol of the stock to get a news summary.
 */
export async function getNewsSummary(
  endpoint: string,
  symbol: string,
): Promise<GetNewsSummaryResponse> {
  // TODO: This should be a GET method with a URL query param
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/news?symbol=${symbol}`,
  });
  return new GetNewsSummaryResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
