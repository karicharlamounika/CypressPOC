// cypress.config.js — ES Module syntax (matches "type":"module" in package.json)
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    specPattern: 'cypress/*.cy.js',
    retries: 0,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    supportFile: false,
    screenshotOnRunFailure: false,
    video: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});