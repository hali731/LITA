import { NavLink } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import { MORE_NAV } from "./AdminNav";

export default function MorePage() {
  const renderIcon = (iconName) => {
    const Icon = FiIcons[iconName];
    return <Icon />;
  };

  return (
    <div className="more-page">
      <h2>Quản lý khác</h2>

      <div className="more-grid">
        {MORE_NAV.map((item) => (
          <NavLink key={item.path} to={item.path} className="more-item">
            {renderIcon(item.icon)}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}