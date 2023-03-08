import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import useRegister from "../hooks/useRegister";

function RegisterPage() {
  const { locale } = useContext(LocaleContext);
  const [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    register,
  ] = useRegister();

  return (
    <div className="register-page-container">
      <div className="register-page-title">
        <h5>{locale === "id" ? "Daftar" : "Register"}</h5>
      </div>
      <div className="name-container">
        <label htmlFor="nameInput">Name</label>
        <input
          id="nameInput"
          type="text"
          placeholder={
            locale === "id" ? "Masukkan nama anda" : "Input your name"
          }
          value={name}
          onChange={setName}
        />
      </div>
      <div className="email-container">
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="text"
          placeholder={
            locale === "id" ? "Masukkan email anda" : "Input your email"
          }
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="password-container">
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          placeholder={
            locale === "id" ? "Masukkan password anda" : "Input your password"
          }
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="confirmPassword-container">
        <label htmlFor="confirmPasswordInput">Confirm Password</label>
        <input
          id="confirmPasswordInput"
          type="password"
          placeholder={
            locale === "id" ? "Masukkan password anda" : "Input your password"
          }
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
        />
      </div>
      <div className="button-container">
        <button onClick={register}>
          {locale === "id" ? "Daftar" : "Register"}
        </button>
      </div>
      <div className="problem-container">
        <h5>
          {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
          <Link to="/" className="login-button">
            {locale === "id" ? "Masuk" : "Login"}
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default RegisterPage;
