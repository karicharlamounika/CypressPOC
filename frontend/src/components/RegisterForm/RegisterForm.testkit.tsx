import RegisterForm from "./RegisterForm.component";
import * as sel from "./RegisterForm.selectors";

export const defaultValues = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "secret123"
};

export function mountRegisterForm(overrides: Record<string, any> = {}) {
  const props = { ...overrides };
  cy.mount(<RegisterForm {...(props as any)} />);

  const getFirstName = () => cy.get(sel.FIRST_NAME);
  const getLastName = () => cy.get(sel.LAST_NAME);
  const getEmail = () => cy.get(sel.EMAIL);
  const getPassword = () => cy.get(sel.PASSWORD);
  const getRegisterBtn = () => cy.get(sel.REGISTER_BTN);
  const getError = () => cy.get(sel.ERROR_ALERT);

  const fill = (values: Partial<typeof defaultValues>) => {
    if (values.firstName !== undefined) getFirstName().clear().type(values.firstName);
    if (values.lastName !== undefined) getLastName().clear().type(values.lastName);
    if (values.email !== undefined) getEmail().clear().type(values.email);
    if (values.password !== undefined) getPassword().clear().type(values.password);
  };

  const submit = () => getRegisterBtn().click();

  return {
    props,
    getFirstName,
    getLastName,
    getEmail,
    getPassword,
    getRegisterBtn,
    getError,
    fill,
    submit
  };
}