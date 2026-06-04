import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import SupplierRoutes from "./modules/supplier/routes/SupplierRoutes.jsx";
import VendorDashboard from "./pages/VendorDasgboard.jsx";
import OTPVerification from './components/auth/OTPVerification.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoutes from './modules/admin/routes/AdminRoutes.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<OTPVerification/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/dashboard/*" element={
        <ProtectedRoute role="ADMIN">
          <AdminRoutes />
        </ProtectedRoute>
      } />
      <Route path="/supplier/*" element={
         <ProtectedRoute role="SUPPLIER">
          <SupplierRoutes/>
         </ProtectedRoute>
      } />
      <Route path="/vendor/dashboard" element={
         <ProtectedRoute role="VENDOR">
          <VendorDashboard />
         </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;