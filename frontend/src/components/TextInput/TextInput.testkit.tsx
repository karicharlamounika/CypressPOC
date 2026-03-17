import React, { useState } from "react";
import TextInput from "./TextInput.component";

export const defaultTestProps = {
  "data-qa": "textinput-ctl",
  placeholder: "Enter text",
};

type MountOverrides = Record<string, any> & { controlled?: boolean };

function StatefulWrapper(props: { inputProps: any }) {
  const { inputProps } = props;
  const [val, setVal] = useState(inputProps.defaultValue ?? inputProps.value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (typeof inputProps.onChange === "function") {
      inputProps.onChange(e);
    }
  };

  return <TextInput {...inputProps} value={val} onChange={handleChange} />;
}

export function mountTextInput(overrides: MountOverrides = {}) {
  const props = { ...defaultTestProps, ...overrides };

  // If test explicitly wants a controlled input, mount it directly.
  if (overrides.controlled) {
    // mount as controlled: caller must manage value prop in test
    cy.mount(<TextInput {...(props as any)} />);
  } else {
    // mount with a small stateful wrapper so cy.type updates the value
    cy.mount(<StatefulWrapper inputProps={props} />);
  }

  const selector = `[data-qa="${props["data-qa"]}"]`;
  const getInput = () => cy.get(`input${selector.startsWith("[") ? selector : `[data-qa="${props["data-qa"]}"]`}`);
  const type = (text: string, opts?: Partial<Cypress.TypeOptions>) => getInput().type(text, opts);
  const clear = () => getInput().clear();

  return { props, getInput, type, clear };
}