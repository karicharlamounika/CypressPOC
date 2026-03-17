import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.page.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.component";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  const handleError = (message: string) => {
    console.warn("Registration error:", message);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>

        <RegisterForm onSuccess={handleSuccess} onError={handleError} />

        <button type="button" className={styles.mutedButton} onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;