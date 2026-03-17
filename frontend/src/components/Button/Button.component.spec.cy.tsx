import { mountButton } from "./Button.testkit";

describe("Button component - tests", () => {
  it("renders default state and forwards representative props and events", () => {
    const onClick = cy.stub();
    const { getButton } = mountButton({ onClick });

    getButton().should("not.be.disabled");
    getButton().should("have.attr", "type", "button");
    getButton().should("have.attr", "title", "hover me");
    getButton().should("have.class", "btn--primary");
    getButton().click().then(() => {
      expect(onClick).to.have.been.calledOnce;
    });
  });

  it("forwards boolean attr and preserves className/variant", () => {
    const { getButton } = mountButton({ disabled: true, variant: "muted", className: "extra" });

    getButton().should("be.disabled");
    getButton().should("have.class", "btn--muted");
    getButton().should("have.class", "extra");
  });
});