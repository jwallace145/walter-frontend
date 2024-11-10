/**
 * The possible response statuses from Walter API.
 */
export enum WalterAPIStatus {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
}

/**
 * WalterAPIResponse
 *
 * The format of the response objects returned from Walter API.
 */
export interface WalterAPIResponse {
  api: string;
  status: WalterAPIStatus;
  message: string;
  data?: any;
}

export abstract class WalterAPIResponseBase implements WalterAPIResponse {
  api: string;
  status: WalterAPIStatus;
  message: string;

  constructor(api: string, status: string, message: string) {
    this.api = api;
    this.status = this.parseStatus(status);
    this.message = message;
  }

  public isSuccess(): boolean {
    return this.status === WalterAPIStatus.SUCCESS;
  }

  public isFailure(): boolean {
    return this.status === WalterAPIStatus.FAILURE;
  }

  public getMessage(): string {
    return this.message;
  }

  private parseStatus(status: string) {
    if (status === 'Success') {
      return WalterAPIStatus.SUCCESS;
    } else {
      return WalterAPIStatus.FAILURE;
    }
  }
}
