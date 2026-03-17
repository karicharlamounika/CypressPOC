// Minimal custom commands + typings augmentation
declare global {
  namespace Cypress {
    interface Chainable {
      // mount is added by component support; declare here for TS friendliness
      mount: (...args: any[]) => Chainable;
      /**
       * Add other app-specific commands here, e.g.
       * login(email: string, password: string): Chainable<void>;
       */
    }
  }
}

// Example stub (no runtime export)
// You can later implement Cypress.Commands.add('login', ...) in component.ts or e2e.ts
export {};