import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/auth/auth.css";

import facebookIcon from "../../assets/img/Facebook.png";
import googleIcon from "../../assets/img/Google.png";

import { loginApi } from "../../services/auth.service";

export default function Login({ switchToRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const redirect = localStorage.getItem("redirectAfterLogin");

  const handleLogin = async () => {
    try {
      const res = await loginApi(form);

      const { token, user } = res.data.data;

      // lưu local
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (redirect) {
  localStorage.removeItem("redirectAfterLogin");
  navigate(redirect);
  return;
}

// fallback theo role
if (user.role === "admin") navigate("/admin");
else if (user.role === "staff") navigate("/staff");
else navigate("/select-table");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="auth-button" onClick={handleLogin}>
        Login
      </button>

      {/* giữ UI social */}
      <div className="auth-social">
        <div className="social-btn">
          <img src={facebookIcon} alt="Facebook" />
          <span>Facebook</span>
        </div>
        <div className="social-btn">
          <img src={googleIcon} alt="Google" />
          <span>Google</span>
        </div>
      </div>

      <p className="auth-link" onClick={switchToRegister}>
        No account? Register
      </p>
    </div>
  );
}