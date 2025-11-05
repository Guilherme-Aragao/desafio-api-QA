const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    setupNodeEvents(on, config) {
      // Ativa o Allure automaticamente
      allureWriter(on, config);
      return config;
    },
  },
  env: {
    allure: true, // 👈 ativa o Allure por padrão
    allureReuseAfterSpec: true,
  },
});
