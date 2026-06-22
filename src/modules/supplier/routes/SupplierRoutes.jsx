import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";
import StockList from "../pages/StockList";
import VendorRequests from "../pages/VendorRequests";
import Profile from "../pages/Profile";
import SupplierLayout from "../components/SupplierLayout";
import Invoice from "../../billing and invoice/pages/invoices/Invoices";
import Billings from "../../billing and invoice/pages/billing/Billings";
import Payments from "../../billing and invoice/pages/payments/Payments";
import BillingReports from "../../billing and invoice/pages/reports/BillingReports";
import Chats from "../../chats/chats";

const SupplierRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="dashboard" />} />

      <Route path="dashboard" element={<Dashboard />} />

      <Route path="add-product" element={<AddProduct />} />

      <Route path="stock-list" element={<StockList />} />

      <Route path="vendor-requests" element={<VendorRequests />} />

      <Route path="profile" element={<Profile />} />

      {/* Invoice & Billing */}
      <Route path="invoices" element={
          <SupplierLayout>
              <Invoice />
          </SupplierLayout>
      } />

      <Route path="billings" element={
          <SupplierLayout>
              <Billings />
          </SupplierLayout>
      } />

      <Route path="payments" element={
          <SupplierLayout>
              <Payments />
          </SupplierLayout>
      } />

      <Route path="reports" element={
          <SupplierLayout>
              <BillingReports />
          </SupplierLayout>
      } />
      <Route path="chats" element={
          <SupplierLayout>
               <Chats />
          </SupplierLayout>
      } />

    </Routes>
  );
};

export default SupplierRoutes;