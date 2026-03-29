import { useState } from "react";
import ItemForm from "./ItemForm.component";
import { NAME_INPUT, QTY_INPUT, SUBMIT_BTN } from "./ItemForm.selectors";

type ChangeFields = { name?: string; quantity?: number };

type MountOptions = {
  name?: string;
  quantity?: number;
  onChange?: (fields: ChangeFields) => void;
  onSubmit?: () => void;
  controlled?: boolean;
};

function StatefulWrapper(props: MountOptions) {
  const [name, setName] = useState(props.name ?? "");
  const [quantity, setQuantity] = useState(props.quantity ?? 1);

  const handleChange = (fields: ChangeFields) => {
    if (fields.name !== undefined) setName(fields.name);
    if (fields.quantity !== undefined) setQuantity(fields.quantity);
    props.onChange?.(fields);
  };

  return (
    <ItemForm
      name={name}
      quantity={quantity}
      onChange={handleChange}
      onSubmit={props.onSubmit ?? (() => { })}
    />
  );
}

function ControlledWrapper(props: MountOptions) {
  const [name, setName] = useState(props.name ?? "");
  const [quantity, setQuantity] = useState(props.quantity ?? 1);

  const handleChange = (fields: ChangeFields) => {
    if (fields.name !== undefined) setName(fields.name);
    if (fields.quantity !== undefined) setQuantity(fields.quantity);
    props.onChange?.(fields);
  };

  return (
    <ItemForm
      name={name}
      quantity={quantity}
      onChange={handleChange}
      onSubmit={props.onSubmit ?? (() => { })}
    />
  );
}

export function mountItemForm(opts: MountOptions = {}) {
  const props = { name: "", quantity: 1, ...opts };

  if (props.controlled) {
    cy.mount(<ControlledWrapper {...props} />);
  } else {
    cy.mount(<StatefulWrapper {...props} />);
  }

  const getNameInput = () => cy.get(NAME_INPUT);
  const getQtyInput = () => cy.get(QTY_INPUT);

  const typeName = (text: string) => getNameInput().clear().type(text);
  const typeQty = (val: string | number) =>
    getQtyInput().clear().type(String(val));

  const submit = () => cy.get(SUBMIT_BTN).click();

  return { props, getNameInput, getQtyInput, typeName, typeQty, submit };
}