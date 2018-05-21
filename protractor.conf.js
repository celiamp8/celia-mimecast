exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './features/*.feature'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: './step-definitions/*.js',
  },
  params: {
    env: {
      hostname: 'https://login-alpha.mimecast.com'
    }
  }
};