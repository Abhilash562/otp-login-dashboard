import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SupplierDashboard from "./pages/SupplierDashboard.jsx";
import VendorDashboard from "./pages/VendorDasgboard.jsx";
import OTPVerification from './components/auth/OTPVerification.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<OTPVerification/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/supplier/dashboard" element={
         <ProtectedRoute role="supplier">
          <SupplierDashboard />
         </ProtectedRoute>
      } />
      <Route path="/vendor/dashboard" element={
         <ProtectedRoute role="vendor">
          <VendorDashboard />
         </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;