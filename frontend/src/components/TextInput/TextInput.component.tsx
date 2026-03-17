import React from "react";
import "./TextInput.component.style.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<Props> = ({
  className = "",
  value,
  defaultValue,
  onChange,
  placeholder,
  type = "text",
  disabled,
  style,
  ...rest
}) => {
  return (
    <input
      className={`text-input ${className}`.trim()}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      style={style}
      {...rest}
    />
  );
};

export default TextInput;