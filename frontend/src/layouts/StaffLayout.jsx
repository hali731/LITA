//frontend/src/pages/admin/staffLayout.jsx
import { NavLink, Outlet, useNavigate  } from "react-router-dom";
import { logout } from "../utils/logout";
import "../assets/style/admin/adminLayout.css";
import logoLITA from "../assets/img/LOGOLITA-preview.png";

import * as FiIcons from "react-icons/fi";
import { STAFF_NAV, STAFF_MORE } from "../components/staff/StaffNav";

export default function StaffLayout() {
  const navigate = useNavigate();
  const renderIcon = (iconName) => {
    const Icon = FiIcons[iconName];
    return <Icon />;
  };

  return (
    <div className="admin-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <nav>
          <p className="nav-group">Chính</p>
          {STAFF_NAV.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}

          <p className="nav-group">Khác</p>
          {STAFF_MORE.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="user-card">
          <div className="avatar"></div>
          <div>
            <p className="name">Staff LITA</p>
            <span className="role">Nhân viên</span>
            <button
              className="logout-btn"
              onClick={() => logout(navigate)}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img src={logoLITA} alt="logo" className="mobile-logo" />

        <div className="mobile-actions">
          <NavLink to="/staff/profile" className="mobile-user">
            <div className="avatar"></div>
            <span className="role">Nhân viên</span>
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

      {/* ===== MOBILE NAV ===== */}
      <nav className="bottom-nav">
        {STAFF_NAV.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {renderIcon(item.icon)}
            <span>{item.label}</span>
          </NavLink>
        ))}

        <NavLink to="/staff/profile">
          <FiIcons.FiUser />
          <span>Me</span>
        </NavLink>
      </nav>
    </div>
  );
}