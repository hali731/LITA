//
import { Routes, Route } from "react-router-dom";

import StaffLayout from "../layouts/StaffLayout";
import Analytics from "../pages/admin/Analytics"; 
import Orders from "../pages/admin/Orders";
import POS from "../pages/staff/POS";
import Profile from "../pages/staff/profile";


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        
        <Route index element={<POS />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="orders" element={<Orders />} />
        <Route path="pos" element={<POS />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}