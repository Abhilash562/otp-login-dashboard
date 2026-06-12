import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BrowserProducts from "../pages/BrowseProducts";
import MyOrders from "../pages/MyOrders";
import RequestProduct from "../pages/RequestProduct";
import Profile from "../pages/Profile";
import Invoices from "../../billing and invoice/pages/invoices/Invoices";
import Payments from "../../billing and invoice/pages/payments/Payments";
import VendorLayout from "../components/VendorLayout";
import BillingReports from "../../billing and invoice/pages/reports/BillingReports";
import Billings from "../../billing and invoice/pages/billing/Billings";

const VendorRoutes = () => {

    return(
        <Routes>
            
            <Route path="/" element={<Navigate to ="dashboard" />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="browse-products" element={<BrowserProducts />} />

            <Route path="my-orders" element={<MyOrders />} />

            <Route path="request-product" element={<RequestProduct />} />

            <Route path="profile" element={<Profile />} />

            {/* Invoice & Billing */}
            <Route path="invoices" element={
                <VendorLayout>
                    <Invoices />
                </VendorLayout>
            } />

            <Route path="billings" element={
                <VendorLayout>
                    <Billings />
                </VendorLayout>
            } />

            <Route path="payments" element={
                <VendorLayout>
                    <Payments />
                </VendorLayout>
            } />

            <Route path="reports" element={
                <VendorLayout>
                    <BillingReports />
                </VendorLayout>
            } />

        </Routes>
    )

}

export default VendorRoutes;