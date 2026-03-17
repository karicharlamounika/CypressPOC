import Button from "./Button.component";

export const defaultTestProps: { "data-qa": string; title: string; children?: React.ReactNode } = {
  "data-qa": "button-cta",
  title: "hover me",
  children: "CTA"
};

export function mountButton(overrides: Record<string, any> = {}) {
  const props = { ...defaultTestProps, ...overrides };
  // mount the component using the global cy.mount command
  cy.mount(<Button {...(props as any)}>{props.children ?? "CTA"}</Button>);

  const getButton = () => cy.get(`[data-qa="${props["data-qa"]}"]`);
  const click = (opts?: Partial<Cypress.ClickOptions>) => getButton().click(opts);

  return { props, getButton, click };
}