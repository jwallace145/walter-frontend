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
