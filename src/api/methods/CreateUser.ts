import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { CREATE_USER_METHOD } from '../common/Methods';

/**
 * CreateUserResponse
 *
 * The response object from the CreateUser API.
 */
export class CreateUserResponse extends WalterAPIResponseBase {}

/**
 * Create a user via the CreateUser API.
 *
 * @param endpoint
 * @param email
 * @param username
 * @param password
 */
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
    CREATE_USER_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
