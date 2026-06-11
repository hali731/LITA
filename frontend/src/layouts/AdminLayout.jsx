//src/layouts/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import "../assets/style/admin/adminLayout.css";
import logoLITA from "../assets/img/LOGOLITA-preview.png";

import * as FiIcons from "react-icons/fi";
import { MAIN_NAV, MORE_NAV } from "../components/admin/AdminNav";
import { getProfileApi } from "../services/auth.service";
import { useState, useEffect } from "react";
export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const renderIcon = (iconName) => {
    const Icon = FiIcons[iconName];
    return <Icon />;
  };
useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const res = await getProfileApi();
    setUser(res.data.data);
  } catch (err) {
    console.error("Get profile error:", err);
  }
};
  return (
    <div className="admin-layout">

      {/* ===== SIDEBAR (DESKTOP) ===== */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <nav>
          <p className="nav-group">Chính</p>
          {MAIN_NAV.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}

          <p className="nav-group">Khác</p>
          {MORE_NAV.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="user-card">
  <div className="avatar"></div>
  <div>
    <p className="name">Admin LITA</p>
    <span className="role">Quản trị viên</span>
  </div>

  <button
    className="logout-btn"
    onClick={() => logout(navigate)}
  >
    Logout
  </button>
</div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img src={logoLITA} alt="logo" className="mobile-logo" />

        <div className="mobile-actions">

          <NavLink to="/admin/profile" className="mobile-user">
           <p className="name">{user?.name || "Loading..."}</p>
<span className="role">
  {user?.role === "admin"
    ? "Quản trị viên"
    : user?.role === "staff"
    ? "Nhân viên"
    : "User"}
</span>
          </NavLink>
          {/* 🔥 logout */}
    <button
      className="mobile-logout"
      onClick={() => logout(navigate)}
    >
      <FiIcons.FiLogOut />
    </button>

        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="bottom-nav">
  {MAIN_NAV.map((item) => (
    <NavLink key={item.path} to={item.path}>
      {renderIcon(item.icon)}
      <span>{item.label}</span>
    </NavLink>
  ))}

  {/* ✅ đúng */}
  <NavLink to="/admin/more">
    <FiIcons.FiMoreHorizontal />
    <span>More</span>
  </NavLink>
</nav>
    </div>
  );
}