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

export const isValidEmail: (email: string) => boolean = (
  email: string,
): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidUsername: (username: string) => boolean = (
  username: string,
): boolean => {
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  return usernamePattern.test(username);
};

export const FULL_PAGE_WIDTH: number = 12;
export const HALF_PAGE_WIDTH: number = 6;

export const Colors = {
  BLACK: '#000000',
  BLACK_HOVER: '#444444',
  LIGHT_GRAY: '#FAFAFA',
  GRAY: '#cccccc',
  DARK_GRAY: '#333333',
  YELLOW: '#FFD213',
  YELLOW_HOVER: '#F1B800',
  WHITE: '#FFFFFF',
  LIGHT_BLUE: '#B5E0F7',
  DARK_BLUE: '#003366',
  TEAL: '#4C9F8D',
  LAVENDER: '#D7B9FF',
  OTTER_GREEN: '#8CB89F',
  SLATE_GRAY: '#444B5A',
  ATLANTIC_BLUE: '#4282AA',
  BLURPLE: '#4B5D8A',
};

export const Fonts = {
  RALEWAY: 'Raleway',
};
