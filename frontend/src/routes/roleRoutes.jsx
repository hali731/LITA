//frontend/src/routes/roleRoutes.js
import React from "react";
import AdminRoutes from "./AdminRoutes";
import StaffRoutes from "./staffRoutes";
import CustomerRoutes from "./customerRoutes";

export default function RoleRoutes() {
  return (
    <>
      <AdminRoutes />
      <StaffRoutes />
      <CustomerRoutes />
    </>
  );
}