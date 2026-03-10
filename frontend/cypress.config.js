// cypress.config.js — ES Module syntax (matches "type":"module" in package.json)
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2etests/**/*.cy.js',
    retries: 0,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    screenshotOnRunFailure: true,
    video: true,
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