import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Suppliers from "../pages/Suppliers";
import Vendors from "../pages/Vendors";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import StockMonitoring from "../pages/StockMonitoring";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="stock" element={<StockMonitoring />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reports" element={<Reports/>} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;