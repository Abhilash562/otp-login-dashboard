import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";
import StockList from "../pages/StockList";
import VendorRequests from "../pages/VendorRequests";
import Profile from "../pages/Profile";

const SupplierRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="dashboard" />} />

      <Route path="dashboard" element={<Dashboard />} />

      <Route path="add-product" element={<AddProduct />} />

      <Route path="stock-list" element={<StockList />} />

      <Route path="vendor-requests" element={<VendorRequests />} />

      <Route path="profile" element={<Profile />} />

    </Routes>
  );
};

export default SupplierRoutes;