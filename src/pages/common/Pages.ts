/**
 * Walter Web Pages
 */
export const LANDING_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const DASHBOARD_PAGE = '/dashboard';
export const PORTFOLIO_PAGE = '/portfolio';
export const EXPENSES_PAGE = '/expenses';
export const SETTINGS_PAGE = '/settings';
export const NEWSLETTER_PAGE = '/newsletter';
export const SEND_VERIFY_EMAIL_PAGE = '/send-verify-email';
export const VERIFY_EMAIL_PAGE = '/verify';
export const CHANGE_PASSWORD_PAGE = '/password';
export const SEND_CHANGE_PASSWORD_EMAIL_PAGE = '/password/reset';
export const UNSUBSCRIBE_PAGE = '/unsubscribe';
export const STOCK_PAGE = '/stocks/:symbol';
export const SEARCH_STOCKS_PAGE = 'stocks/search/:symbol';
export const PURCHASE_NEWSLETTER_SUBSCRIPTION_SUCCESS_PAGE =
  '/newsletter/purchase/success';

export const AUTHENTICATED_PAGES: string[] = [
  DASHBOARD_PAGE,
  PORTFOLIO_PAGE,
  SETTINGS_PAGE,
  NEWSLETTER_PAGE,
  STOCK_PAGE,
  SEARCH_STOCKS_PAGE,
  PURCHASE_NEWSLETTER_SUBSCRIPTION_SUCCESS_PAGE,
];
