describe('As a logged in user I can add, update and delete an item', () => {

beforeEach(() => {
    cy.navigateToApp();
    cy.login();
  });


  it('E2EFlow2_Verify user is able to add, update and delete an item in catalog', () => {

    cy.addItem();
    cy.validateItemAdded();
    cy.updateItem();
    cy.validateItemUpdated();
    cy.getItemNameList().then((itemsListBeforeDelete) => {
      console.log('Items before delete:', itemsListBeforeDelete);
      cy.deleteItem();
      cy.getItemNameList().then((itemsListAfterDelete) => {
        console.log('Items after delete:', itemsListAfterDelete);
        expect(itemsListBeforeDelete.length).to.be.greaterThan(itemsListAfterDelete.length);
      });
    });
  });

  afterEach(() => {
    cy.logout();
  });
});