/**
 * The name of the authentication cookie
 */
export const WALTER_TOKEN_NAME: string = 'WalterToken';

/**
 * USD Number Format
 *
 * This constant is used to convert numbers to properly formatted USD strings
 * with $ and commas for readability.
 */
export const US_DOLLAR: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Walter Web Pages
 */
export const LANDING_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const DASHBOARD_PAGE = '/portfolio';
export const NEWSLETTER_PAGE = '/newsletter';
export const SEND_VERIFY_EMAIL_PAGE = '/send-verify-email';
export const VERIFY_EMAIL_PAGE = '/verify';
export const CHANGE_PASSWORD_PAGE = '/password';
export const RESET_PASSWORD_PAGE = '/reset-password';
export const SUBSCRIBE_PAGE = '/subscribe';
export const UNSUBSCRIBE_PAGE = '/unsubscribe';

/**
 * Walter API Methods
 */
export const AUTH_USER_METHOD: string = 'AuthUser';
export const CREATE_USER_METHOD: string = 'CreateUser';
export const GET_USER_METHOD: string = 'GetUser';
export const GET_STOCK_METHOD: string = 'GetStock';
export const ADD_STOCK_METHOD: string = 'AddStock';
export const DELETE_STOCK_METHOD: string = 'DeleteStock';
export const GET_PORTFOLIO_METHOD: string = 'GetPortfolio';
export const GET_PRICES_METHOD: string = 'GetPrices';
export const SEND_NEWSLETTER_METHOD: string = 'SendNewsletter';
export const SEND_VERIFY_EMAIL_METHOD: string = 'SendVerifyEmail';
export const SUBSCRIBE_METHOD: string = 'Subscribe';
export const UNSUBSCRIBE_METHOD: string = 'Unsubscribe';
export const VERIFY_EMAIL_METHOD: string = 'VerifyEmail';
export const CHANGE_PASSWORD_METHOD: string = 'ChangePassword';
export const SEND_CHANGE_PASSWORD_EMAIL_METHOD: string =
  'SendChangePasswordEmail';
