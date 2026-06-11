import { Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import POScustomer from "../pages/customer/POScustomer";
import SelectTablePage from "../pages/customer/SelectTablePage";
import CustomerOrders from "../pages/customer/Order";
import CustomerProfile from "../pages/customer/Profile";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>

        {/* ✅ vào web → chuyển sang menu */}
        <Route index element={<Navigate to="menu" />} />

        <Route path="menu" element={<POScustomer />} />
         <Route path="select-table" element={<SelectTablePage />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>
    </Routes>
  );
}