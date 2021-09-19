module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  ignorePatterns: ['public/*.js'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    browser: true,
  },
};
