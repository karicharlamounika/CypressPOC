import React from "react";
import TextInput from "../TextInput/TextInput.component";
import Button from "../Button/Button.component";
import "./ItemForm.component.style.css";

type Props = {
  name: string;
  quantity: number;
  onChange: (fields: { name?: string; quantity?: number }) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

const ItemForm: React.FC<Props> = ({ name, quantity, onChange, onSubmit, submitLabel = "Save" }) => {
  return (
    <div className="itemform">
      <TextInput
        data-testid="Name"
        value={name}
        placeholder="Item name"
        onChange={(e) => onChange({ name: e.target.value })}
        className="itemform__name"
      />
      <TextInput
        data-testid="quantity"
        type="number"
        min={0}
        value={quantity}
        onChange={(e) => onChange({ quantity: Number(e.target.value) })}
        onFocus={(e) => e.target.select()}
        className="itemform__qty"
      />
      <Button data-testid="add" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
};

export default ItemForm;