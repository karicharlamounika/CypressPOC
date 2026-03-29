import { mountItemForm } from "./ItemForm.testkit";
import { NAME_INPUT, QTY_INPUT } from "./ItemForm.selectors";

describe("ItemForm component (CT)", () => {
  it("stateful wrapper: typing updates inputs and submit calls onSubmit", () => {
    const onSubmit = cy.stub();
    const { getNameInput, getQtyInput, typeName, submit } =
      mountItemForm({ name: "Original", quantity: 1, onSubmit });

    typeName("New item");
    getNameInput().should("have.value", "New item");

    getQtyInput().invoke("val", "5").trigger("input");
    getQtyInput().should("have.value", "5");

    submit();
    cy.wrap(onSubmit).should("have.been.calledOnce");
  });

  it("controlled mode: emits final onChange payload for name", () => {
    const onChange = cy.stub();
    mountItemForm({ name: "", quantity: 1, onChange, controlled: true });

    cy.get(NAME_INPUT).clear().type("Apple");

    cy.wrap(onChange).should(stub => {
      const last = stub.lastCall.args[0];
      expect(last).to.deep.equal({ name: "Apple" });
    });
  });

  it("controlled mode: emits final onChange payload for quantity", () => {
    const onChange = cy.stub();
    mountItemForm({ name: "", quantity: 100, onChange, controlled: true });

    cy.get(QTY_INPUT).type("10");

    cy.wrap(onChange).should(stub => {
      const calls = stub.getCalls();
      const lastQty = [...calls]
        .reverse()
        .find(c => c.args[0].quantity !== undefined);

      expect(lastQty, "expected a quantity change call").to.exist;
      expect(lastQty!.args[0]).to.deep.equal({ quantity: 10 });
    });
  });
});