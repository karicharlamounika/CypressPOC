import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.page.module.css";
import TextInput from "../../components/TextInput/TextInput.component";
import Button from "../../components/Button/Button.component";

const apiBaseUrl = "http://localhost:5000";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/items");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <TextInput data-testid="useremail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextInput data-testid="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button data-testid="login" onClick={handleLogin}>Login</Button>

        <p className={styles.footer}>
          Don’t have an account?{" "}
          <Link data-testid="registerHere" to="/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;