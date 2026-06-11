import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    localStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search
    );

    return <Navigate to="/" replace />;
  }

  return children;
}