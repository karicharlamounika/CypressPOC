import testData from '../fixtures/testData.json';


Cypress.Commands.add('navigateToApp', () => {
  cy.visit('/login');
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — REGISTER
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('fillRegistrationForm', () => {
  cy.get("[data-testid='firstName']").clear().type(testData.firstName);
  cy.get("[data-testid='lastName']").clear().type(testData.lastName);
  cy.get("[data-testid='email']").clear().type(testData.email);
  cy.get("[data-testid='password']").clear().type(testData.password);
});

Cypress.Commands.add('clickRegister', () => {
  cy.get("[data-testid='register']").click();
});

Cypress.Commands.add('registerUser', () => {
  // Alert listener must be registered BEFORE the action that triggers it
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.contain('Registration successful! Please login.');
  });
  cy.fillRegistrationForm();
  cy.clickRegister();
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — LOGIN
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('enterEmail', () => {
  cy.get("[data-testid='useremail']").clear().type(testData.email);
});

Cypress.Commands.add('enterPassword', () => {
  cy.get("[data-testid='password']").clear().type(testData.password);
});

Cypress.Commands.add('clickLogin', () => {
  cy.get("[data-testid='login']").click();
});

Cypress.Commands.add('login', () => {
  cy.enterEmail();
  cy.enterPassword();
  cy.clickLogin();
});

Cypress.Commands.add('clickOnRegister', () => {
  cy.get("[data-testid='registerHere']").click();
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — LOGOUT
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('logout', () => {
  cy.get("[data-testid='logoutBtn']").click();
});

Cypress.Commands.add('validateLogoutBtnIsVisible', () => {
  cy.get("[data-testid='logoutBtn']").should('be.visible');
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — ADD ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('clickOnAddNewItem', () => {
  cy.get("[data-testid='addNewItem']").click();
});

Cypress.Commands.add('enterNameAndQuantity', () => {
  cy.get("[data-testid='Name']").clear().type(testData.NametoBeAdded);
  cy.get("[data-testid='quantity']").type(testData.QuantitytoBeAdded);
});

Cypress.Commands.add('clickOnAdd', () => {
  cy.get("[data-testid='add']").click();
});

Cypress.Commands.add('addItem', () => {
  cy.clickOnAddNewItem();
  cy.enterNameAndQuantity();
  cy.clickOnAdd();
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — VALIDATE ADDED ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('validateItemAdded', () => {
  cy.get('tbody tr').last().within(() => {
    cy.get('td').eq(0).should('have.text', testData.NametoBeAdded);
    cy.get('td').eq(1).should('have.text', testData.QuantitytoBeAdded);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — UPDATE ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('clickOnEditItem', () => {
  cy.get('tbody tr').last()
    //.find("[data-testid='editActions']")
    .find("[data-testid='editItem']")
    .click();
});

Cypress.Commands.add('enterNewNameAndQuantity', () => {
  cy.get("[data-testid='editName']").clear().type(testData.NameToBeUpdated);
  cy.get("[data-testid='editQuantity']").should('be.visible').focus().type('{selectall}').type(testData.QuantityToBeUpdated);
});

Cypress.Commands.add('clickOnSaveEdit', () => {
  cy.intercept('PUT', '/items/*').as('updateItemRequest');
  cy.get("[data-testid='editSave']").click();
  cy.wait('@updateItemRequest').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('updateItem', () => {
  cy.clickOnEditItem();
  cy.enterNewNameAndQuantity();
  cy.clickOnSaveEdit();
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — VALIDATE UPDATED ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('validateItemUpdated', () => {
  cy.get('tbody tr').last().within(() => {
    cy.get('td').eq(0).should('have.text', testData.NameToBeUpdated);
    cy.get('td').eq(1).should('have.text', testData.QuantityToBeUpdated);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — DELETE ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('deleteItem', () => {
  cy.intercept('DELETE', '/items/*').as('deleteItemRequest');
  cy.get('tbody tr').last()
    // .find("[data-testid='editActions']")
    .find("[data-testid='deleteItem']")
    .click();
  cy.wait('@deleteItemRequest').its('response.statusCode').should('eq', 204);  
  
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — GET ITEM NAME LIST
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('getItemNameList', () => {
  return cy.get('body').then(($body) => {
    if ($body.find("[data-testid='itemsTable'] tbody tr").length > 0) {
      return cy.get("[data-testid='itemsTable'] tbody tr").then(($els) => {
        return [...$els].map((el) => el.innerText.trim());
      });
    } else {
      return [];  
    }
  });
});