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

/**
 * Walter API Methods
 */
export const AUTH_USER_METHOD: string = 'AuthUser';
export const CREATE_USER_METHOD: string = 'CreateUser';
export const GET_USER_METHOD: string = 'GetUser';
export const ADD_STOCK_METHOD: string = 'AddStock';
export const DELETE_STOCK_METHOD: string = 'DeleteStock';
export const GET_PORTFOLIO_METHOD: string = 'GetPortfolio';
export const GET_PRICES_METHOD: string = 'GetPrices';
export const SEND_NEWSLETTER_METHOD: string = 'SendNewsletter';
