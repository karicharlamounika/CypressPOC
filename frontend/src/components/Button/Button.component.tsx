import React from "react";
import "./Button.component.style.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "muted" };

const Button: React.FC<Props> = ({
    variant = "primary",
    className = "",
    children,
    onClick,
    disabled,
    type = "button",
    style,
    ...rest
}) => {
    const cls = `btn ${variant === "muted" ? "btn--muted" : "btn--primary"} ${className}`.trim();

    return (
        <button
            className={cls}
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={style}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;