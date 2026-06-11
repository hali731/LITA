//frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth/AuthPage";
import AdminRoutes from "./routes/AdminRoutes";
import StaffRoutes from "./routes/staffRoutes";
import CustomerRoutes from "./routes/customerRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<AuthPage />} />

      {/* ADMIN */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* STAFF */}
      <Route
        path="/staff/*"
        element={
          <ProtectedRoute>
            <StaffRoutes />
          </ProtectedRoute>
        }
      />

      {/* CUSTOMER (QUÉT QR CŨNG PHẢI LOGIN) */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <CustomerRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}