import { mountTextInput } from "./TextInput.testkit";

describe("TextInput component (CT)", () => {
    it("renders default state and accepts input", () => {
        const { getInput, type } = mountTextInput();
        getInput().should("have.attr", "placeholder", "Enter text");
        getInput().should("not.be.disabled");

        type("hello");
        getInput().should("have.value", "hello");
    });

    it("forwards representative props and className", () => {
        const { getInput } = mountTextInput({ "data-qa": "ti-1", "aria-label": "label-1", className: "extra" });

        getInput().should("have.attr", "aria-label", "label-1");
        getInput().should("have.attr", "data-qa", "ti-1");
        getInput().should("have.class", "extra");
    });

    it("forwards disabled and onChange handler", () => {
        const onChange = cy.stub();
        const { getInput } = mountTextInput({ disabled: true, onChange });

        getInput().should("be.disabled");
        cy.wrap(onChange).then(() => {
            expect(onChange).not.to.have.been.called;
        });

        const onChange2 = cy.stub();
        const { getInput: getInput2, type: type2 } = mountTextInput({ disabled: false, onChange: onChange2 });
        type2("abc");
        cy.then(() => {
            expect(onChange2).to.have.been.called;
        });
        getInput2().should("have.value", "abc");
    });
});