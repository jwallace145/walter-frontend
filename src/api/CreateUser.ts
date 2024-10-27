import axios, { AxiosResponse } from 'axios';

export class CreateUserResponse {
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

export async function createUser(
  endpoint: string,
  email: string,
  username: string,
  password: string,
): Promise<CreateUserResponse> {
  const response: AxiosResponse = await axios.post(`${endpoint}/users`, {
    email: email,
    username: username,
    password: password,
  });
  return new CreateUserResponse(
    response.data['Status'],
    response.data['Message'],
  );
}
