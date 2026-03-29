import { mountItemsTable, defaultItems } from "./ItemsTable.testkit";

describe("ItemsTable component (CT)", () => {
  it("renders rows and shows item data", () => {
    const { getTable, getRows, getItem } = mountItemsTable();
    getTable().should("be.visible");
    getRows().should("have.length", defaultItems.length);

    defaultItems.forEach((item, i) => {
      getItem(i).should("deep.equal", {
        name: item.name,
        quantity: item.quantity,
      });
    });
  });

  it("renders no rows when items is empty", () => {
    const { getRows } = mountItemsTable({ items: [] });
    getRows().should("have.length", 0);
    getRows().should("not.exist");
  });


  it("calls onStartEdit with the correct item when edit clicked", () => {
    const onStartEdit = cy.stub();
    const { clickEdit } = mountItemsTable({ onStartEdit });

    clickEdit(1);
    cy.wrap(onStartEdit).should("have.been.calledOnce");
    cy.wrap(onStartEdit).its("firstCall.args.0").should("deep.equal", defaultItems[1]);
  });

  it("calls onDelete with id when delete clicked", () => {
    const onDelete = cy.stub();
    const { clickDelete } = mountItemsTable({ onDelete });

    clickDelete(0);
    cy.wrap(onDelete).should("have.been.calledOnceWith", defaultItems[0].id);
  });

  it("does not call callbacks when clicking row background", () => {
    const onStartEdit = cy.stub();
    const onDelete = cy.stub();

    const { getRowByIndex } = mountItemsTable({ onStartEdit, onDelete });

    getRowByIndex(0).click();

    cy.wrap(onStartEdit).should("not.have.been.called");
    cy.wrap(onDelete).should("not.have.been.called");
  });
});