import axios, { AxiosResponse } from 'axios';

export class SendNewsletterResponse {
  private readonly status: string;
  private readonly message: string;

  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }

  public isSuccess(): boolean {
    return this.status === 'Success';
  }

  public getMessage(): string {
    return this.message;
  }
}

export async function sendNewsletter(
  endpoint: string,
  token: string,
): Promise<SendNewsletterResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/newsletters`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return new SendNewsletterResponse(
    response.data['Status'],
    response.data['Message'],
  );
}
