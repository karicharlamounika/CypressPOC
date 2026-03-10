
// This file runs before every test file automatically.
import './commands';

// Cypress resets state between tests automatically via these hooks.
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Applied globally before each test. Also set in cypress.config.js.
beforeEach(() => {
  cy.viewport(1920, 1080);
});

// ─── Suppress benign app errors that would otherwise fail tests ───────────────────────────────
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver') ||
    err.message.includes('Non-Error promise rejection')
  ) {
    return false;
  }
  return true;
});