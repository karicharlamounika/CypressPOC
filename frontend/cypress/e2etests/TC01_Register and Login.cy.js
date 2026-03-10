describe('As a new user I can register and login', () => {

  // Replaces: test.beforeEach → basePage.navigate()
  beforeEach(() => {
    cy.navigateToApp();
  });

  it('E2EFlow1_Verify user is able to register and login', () => {

    cy.clickOnRegister();
    cy.registerUser();
    cy.login();
    cy.validateLogoutBtnIsVisible();
    cy.logout();
  });

});