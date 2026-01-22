import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./SignIn.module.css";
import axiosBase from "../../axiosConfig";
import { useLanguage } from "../../contexts/LanguageContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(t("allFieldsRequired"));
      return;
    }

    try {
      const response = await axiosBase.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate("/");
    } catch (err) {
      setError(t("invalidEmailPassword"));
    }
  };

  return (
    <div className={styles.loginCard}>
      <h2 className={styles.title}>{t("loginToAccount")}</h2>

      <p className={styles.signupText}>
        {t("dontHaveAccount")}{" "}
        <span onClick={() => navigate("/register")}>{t("createNewAccount")}</span>
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder={t("emailAddress")}
          value={formData.email}
          onChange={handleChange}
        />

        <div className={styles.passwordGroup}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={handleChange}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* forgot password */}
        <p
          className={styles.forgot}
          onClick={() => navigate("/forgot-password")}
        >
          {t("forgotPassword")}
        </p>

        <button type="submit" className={styles.submitBtn}>
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
