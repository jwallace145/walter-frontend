import { WalterAPIResponseBase } from './Response';
import axios, { AxiosResponse } from 'axios';
import { CHANGE_PASSWORD_METHOD } from '../constants/Constants';

/**
 * ChangePasswordResponse
 *
 * The response object for the ChangePassword API which helps users who
 * have forgotten their password reset it.
 */
export class ChangePasswordResponse extends WalterAPIResponseBase {}

/**
 * Change the user's password via the ChangePassword API.
 *
 * @param endpoint
 * @param token
 * @param newPassword
 */
export async function changePassword(
  endpoint: string,
  token: string,
  newPassword: string,
): Promise<ChangePasswordResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/passwords`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      new_password: newPassword,
    },
  });
  return new ChangePasswordResponse(
    CHANGE_PASSWORD_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
