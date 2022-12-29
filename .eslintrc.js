module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'airbnb/base',
    'prettier',
    'plugin:you-dont-need-lodash-underscore/compatible',
    '@vue/prettier',
  ],
  plugins: ['import', 'vue'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    config: 'readable',
  },
  rules: {
    'vue/order-in-components': 'warn',
    'no-console': 'off',
    'eol-last': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'on',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-new': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'onf',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-undef': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
