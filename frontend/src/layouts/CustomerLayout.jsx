import { NavLink, Outlet, useNavigate  } from "react-router-dom";
import { logout } from "../utils/logout";
import * as FiIcons from "react-icons/fi";
import logoLITA from "../assets/img/LOGOLITA-preview.png";
import "../assets/style/admin/adminLayout.css";

export default function CustomerLayout() {
  const navigate = useNavigate();
  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <nav>
          <p className="nav-group">Khách hàng</p>

          <NavLink to="/menu">
            <FiIcons.FiGrid /> Gọi món
          </NavLink>

          <NavLink to="/orders">
            <FiIcons.FiFileText /> Đơn hàng
          </NavLink>

          <NavLink to="/profile">
            <FiIcons.FiUser /> Cá nhân
          </NavLink>
        </nav>

        <div className="user-card">
  <div className="avatar"></div>
  <div>
    <p className="name">Khách</p>
    <span className="role">Customer</span>
  </div>

  <button
    className="logout-btn"
    onClick={() => logout(navigate)}
  >
    Logout
  </button>
</div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="mobile-header">
        <img src={logoLITA} alt="logo" className="mobile-logo" />

        <div className="mobile-actions">
          <FiIcons.FiSearch />
          {/* ❌ KHÔNG cart ở đây */}
          {/* 🔥 logout */}
    <button
      className="mobile-logout"
      onClick={() => logout(navigate)}
    >
      <FiIcons.FiLogOut />
    </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* MOBILE NAV */}
      <nav className="bottom-nav">
        <NavLink to="/menu">
          <FiIcons.FiGrid />
          <span>Menu</span>
        </NavLink>

        <NavLink to="/orders">
          <FiIcons.FiFileText />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/profile">
          <FiIcons.FiUser />
          <span>Me</span>
        </NavLink>
      </nav>
    </div>
  );
}