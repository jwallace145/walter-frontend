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

  public getStatus(): string {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }

  public getData(): any {
    return this.data;
  }
}
