import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import useLogin from "../hooks/useLogin";
import { login } from "../utils/api";

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  const [email, setEmail, password, setPassword] = useLogin();

  const onLogin = async () => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <div>
      <div className="login-page-container">
        <div className="login-page-title">
          <h5>Login</h5>
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
        <div className="button-container">
          <button onClick={() => onLogin()}>
            {locale === "id" ? "Masuk" : "Login"}
          </button>
        </div>
        <div className="problem-container">
          <h5>
            {locale === "id" ? "Belum punya akun?" : "Need an Account?"}{" "}
            <Link to="/register" className="register-button">
              {locale === "id" ? "Daftar" : "Register"}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
