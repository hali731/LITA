import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../../assets/style/auth/auth.css";

import logoLITA from "../../assets/img/LOGOLITA-preview.png";
import imgCuaHang from "../../assets/img/thiet-ke-cua-hang-thuc-an-nhanh.jpg";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="auth-page">

      <div className="auth-banner">
        <img src={imgCuaHang} alt="store" />
      </div>

      <img src={logoLITA} className="auth-logo" alt="LITA" />

      <div className={`auth-wrapper slide-container ${isRegister ? "show-register" : ""}`}>

        <div className="slide login">
          <Login switchToRegister={() => setIsRegister(true)} />
        </div>

        <div className="slide register">
          <Register switchToLogin={() => setIsRegister(false)} />
        </div>

      </div>

    </div>
  );
}