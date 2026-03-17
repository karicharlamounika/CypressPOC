import React, { useState } from "react";
import TextInput from "../TextInput/TextInput.component";
import Button from "../Button/Button.component";
import "./RegisterForm.component.style.css";

type Props = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

const RegisterForm: React.FC<Props> = ({ onSuccess, onError }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSuccess?.();
      } else if (res.status === 409) {
        setError("User already registered.");
        onError?.("User already registered.");
      } else {
        setError("Registration failed.");
        onError?.("Registration failed.");
      }
    } catch {
      setError("Registration failed.");
      onError?.("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="rf__form" onSubmit={handleSubmit} aria-live="polite">
      <TextInput data-testid="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
      <TextInput data-testid="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
      <TextInput data-testid="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <TextInput data-testid="password" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

      {error && <div className="rf__error" role="alert">{error}</div>}

      <div className="rf__actions">
        <Button data-testid="register" type="submit" disabled={loading}>{loading ? "Registering…" : "Register"}</Button>
      </div>
    </form>
  );
};

export default RegisterForm;