module.exports = {
  parser: '@typescript-eslint/parser', // Specify the ESLint parser
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
    'plugin:react/recommended', // Use the recommended rules from the React plugin
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the TypeScript plugin
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allow modern ECMAScript features
    sourceType: 'module', // Allow using import/export
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    // Add additional custom rules here
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React to use
    },
  },
};
