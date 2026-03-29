import { mountRegisterForm, defaultValues } from "./RegisterForm.testkit";

describe("RegisterForm component (CT)", () => {
  it("renders inputs and default button state", () => {
    const { getFirstName, getLastName, getEmail, getPassword, getRegisterBtn } = mountRegisterForm();
    getFirstName().should("be.visible").and("have.attr", "name", "firstName");
    getLastName().should("be.visible").and("have.attr", "name", "lastName");
    getEmail().should("be.visible").and("have.attr", "type", "email");
    getPassword().should("be.visible").and("have.attr", "type", "password");
    getRegisterBtn().should("not.be.disabled").and("have.text", "Register");
  });

  it("updates inputs when user types", () => {
    const { getFirstName, getLastName, getEmail, getPassword, fill } = mountRegisterForm();
    fill(defaultValues);
    getFirstName().should("have.value", defaultValues.firstName);
    getLastName().should("have.value", defaultValues.lastName);
    getEmail().should("have.value", defaultValues.email);
    getPassword().should("have.value", defaultValues.password);
  });

  it("calls onSuccess when API returns 200 and shows loading state", () => {
    const onSuccess = cy.stub();
    let resolveFetch: () => void;

    cy.window().then((win) => {
      cy.stub(win, "fetch")
        .callsFake(() => {
          return new win.Promise((resolve) => {
            resolveFetch = () =>
              resolve(
                new win.Response(null, {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                })
              );
          });
        })
        .as("fetchStub");
    });

    const { fill, submit, getRegisterBtn } = mountRegisterForm({ onSuccess });

    fill(defaultValues);
    submit();

    getRegisterBtn().should("have.text", "Registering").and("be.disabled");

    cy.then(() => {
      resolveFetch();
    });

    cy.wrap(onSuccess).should("have.been.calledOnce");
    getRegisterBtn().should("have.text", "Register").and("not.be.disabled");
  });

  it("shows conflict message and calls onError when API returns 409", () => {
    const onError = cy.stub();
    cy.intercept("POST", "/api/register", { statusCode: 409 }).as("register409");
    const { fill, submit, getError } = mountRegisterForm({ onError });

    fill(defaultValues);
    submit();

    cy.wait("@register409");
    cy.wrap(onError).should("have.been.calledOnceWith", "User already registered.");
    getError().should("be.visible").and("have.text", "User already registered.");
  });

  it("shows generic error and calls onError on server error", () => {
    const onError = cy.stub();
    cy.intercept("POST", "/api/register", { statusCode: 500 }).as("register500");
    const { fill, submit, getError } = mountRegisterForm({ onError });

    fill(defaultValues);
    submit();

    cy.wait("@register500");
    cy.wrap(onError).should("have.been.calledOnceWith", "Registration failed.");
    getError().should("be.visible").and("have.text", "Registration failed.");
  });

  it("handles network failures and calls onError", () => {
    const onError = cy.stub();
    cy.intercept("POST", "/api/register", { forceNetworkError: true }).as("registerNetErr");
    const { fill, submit, getError } = mountRegisterForm({ onError });

    fill(defaultValues);
    submit();

    cy.wait("@registerNetErr");
    cy.wrap(onError).should("have.been.calledOnceWith", "Registration failed.");
    getError().should("be.visible").and("have.text", "Registration failed.");
  });
});