module.exports = function (wallaby) {
  const wallabyYoshi = require('yoshi/config/wallaby-jest')(wallaby);
  wallabyYoshi.tests = [
    'src/**/*.spec.js',
    '!test/export-components.spec.js'
  ];
  return wallabyYoshi;
};
