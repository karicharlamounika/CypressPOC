import testData from '../fixtures/testData.json';


Cypress.Commands.add('navigateToApp', () => {
  cy.visit('/login');
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — REGISTER
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('fillRegistrationForm', () => {
  cy.get("[test-id='firstName']").clear().type(testData.firstName);
  cy.get("[test-id='lastName']").clear().type(testData.lastName);
  cy.get("[test-id='email']").clear().type(testData.email);
  cy.get("[test-id='password']").clear().type(testData.password);
});

Cypress.Commands.add('clickRegister', () => {
  cy.get("[test-id='register']").click();
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
  cy.get("[test-id='useremail']").clear().type(testData.email);
});

Cypress.Commands.add('enterPassword', () => {
  cy.get("[test-id='password']").clear().type(testData.password);
});

Cypress.Commands.add('clickLogin', () => {
  cy.get("[test-id='login']").click();
});

Cypress.Commands.add('login', () => {
  cy.enterEmail();
  cy.enterPassword();
  cy.clickLogin();
});

Cypress.Commands.add('clickOnRegister', () => {
  cy.get("[test-id='registerHere']").click();
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — LOGOUT
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('logout', () => {
  cy.get("[test-id='logoutBtn']").click();
});

Cypress.Commands.add('validateLogoutBtnIsVisible', () => {
  cy.get("[test-id='logoutBtn']").should('be.visible');
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — ADD ITEM
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('clickOnAddNewItem', () => {
  cy.get("[test-id='addNewItem']").click();
});

Cypress.Commands.add('enterNameAndQuantity', () => {
  cy.get("[test-id='Name']").clear().type(testData.NametoBeAdded);
  cy.get("[test-id='quantity']").type(testData.QuantitytoBeAdded);
});

Cypress.Commands.add('clickOnAdd', () => {
  cy.get("[test-id='add']").click();
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
    .find("[test-id='editActions']")
    .find("[test-id='editItem']")
    .click();
});

Cypress.Commands.add('enterNewNameAndQuantity', () => {
  cy.get("[test-id='editName']").clear().type(testData.NameToBeUpdated);
  cy.get("[test-id='editQuantity']").should('be.visible').focus().type('{selectall}').type(testData.QuantityToBeUpdated);
});

Cypress.Commands.add('clickOnSaveEdit', () => {
  cy.get('tbody tr').last()
    .find("[test-id='editActions']")
    .find("[test-id='editSave']")
    .click();
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
    .find("[test-id='editActions']")
    .find("[test-id='deleteItem']")
    .click();
  cy.wait('@deleteItemRequest').its('response.statusCode').should('eq', 204);  
  
});

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG — GET ITEM NAME LIST
// ─────────────────────────────────────────────────────────────────────────────

Cypress.Commands.add('getItemNameList', () => {
  return cy.get('body').then(($body) => {
    if ($body.find("[test-id='itemName']").length > 0) {
      return cy.get("[test-id='itemName']").then(($els) => {
        return [...$els].map((el) => el.innerText.trim());
      });
    } else {
      return [];  
    }
  });
});