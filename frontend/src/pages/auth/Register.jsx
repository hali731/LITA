import React, { useState } from "react";
import "../../assets/style/auth/auth.css";

import facebookIcon from "../../assets/img/Facebook.png";
import googleIcon from "../../assets/img/Google.png";

import { registerApi } from "../../services/auth.service";

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await registerApi(form);
      alert("Register success!");
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      <input
  className="auth-input"
  placeholder="Name"
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
/>

<input
  className="auth-input"
  placeholder="Email"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
/>

<input
  className="auth-input"
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
/>

      <button className="auth-button" onClick={handleRegister}>
        Register
      </button>

      {/* giữ UI social */}
      <div className="auth-social">
        <div className="social-btn">
          <img src={googleIcon} alt="Google" />
          <span>Google</span>
        </div>
        <div className="social-btn">
          <img src={facebookIcon} alt="Facebook" />
          <span>Facebook</span>
        </div>
      </div>

      <p className="auth-link" onClick={switchToLogin}>
        Already have account? Login
      </p>
    </div>
  );
}