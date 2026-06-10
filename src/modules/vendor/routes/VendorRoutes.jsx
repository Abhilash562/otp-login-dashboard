import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BrowserProducts from "../pages/BrowseProducts";
import MyOrders from "../pages/MyOrders";
import RequestProduct from "../pages/RequestProduct";
import Profile from "../pages/Profile";

const VendorRoutes = () => {

    return(
        <Routes>
            
            <Route path="/" element={<Navigate to ="dashboard" />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="browse-products" element={<BrowserProducts />} />

            <Route path="my-orders" element={<MyOrders />} />

            <Route path="request-product" element={<RequestProduct />} />

            <Route path="profile" element={<Profile />} />

        </Routes>
    )

}

export default VendorRoutes;