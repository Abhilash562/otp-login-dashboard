import { NavLink, useLocation } from "react-router-dom";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  Stack,
  Collapse,
} from "@mui/material";

import {
  Dashboard,
  People,
  Store,
  Inventory,
  ShoppingCart,
  Assessment,
  Person,
  BarChart,
} from "@mui/icons-material";
import { BarChart3, ChevronDown, ChevronRight, CreditCard, FileText, LogOut, Receipt } from "lucide-react";
import { useEffect, useState } from "react";

const menus = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "Suppliers",
    path: "/admin/dashboard/suppliers",
    icon: <People />,
  },
  {
    name: "Vendors",
    path: "/admin/dashboard/vendors",
    icon: <Store />,
  },
  {
    name: "Products",
    path: "/admin/dashboard/products",
    icon: <Inventory />,
  },
  {
    name: "Orders",
    path: "/admin/dashboard/orders",
    icon: <ShoppingCart />,
  },
  {
    name: "Stock Monitoring",
    path: "/admin/dashboard/stock",
    icon: <Assessment />,
  },
  {
    name: "Profile",
    path: "/admin/dashboard/profile",
    icon: <Person />,
  },
  {
    name: "Reports",
    path: "/admin/dashboard/reports",
    icon: <BarChart />,
  },
];

const billingItems = [
  { name: "Invoices", path: "/admin/dashboard/invoices", icon: <FileText size={16} /> },
  { name: "Billings", path: "/admin/dashboard/billings", icon: <Receipt size={16} /> },
  { name: "Payments", path: "/admin/dashboard/payments", icon: <CreditCard size={16} /> },
  { name: "BillingReports", path: "/admin/dashboard/billingReports", icon: <BarChart3 size={16} /> },
];

const Sidebar = () => {

  const location = useLocation();
  const [billingOpen, setBillingOpen] = useState(false);

  useEffect(() => {
    if (billingItems.some((item) => item.path === location.pathname)) {
      setBillingOpen(true);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "#fff",
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        display: { xs: "none", md: "block" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
            A
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Admin Panel
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Management System
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ p: 2 }}>
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            end={menu.path === "/admin/dashboard"}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  mb: 1,
                  borderRadius: 3,
                  py: 1.2,
                  backgroundColor: isActive
                    ? "#1976d2"
                    : "transparent",
                  color: isActive ? "#fff" : "#374151",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    backgroundColor: isActive
                      ? "#1565c0"
                      : "#f3f4f6",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#fff" : "#6b7280",
                    minWidth: 40,
                  }}
                >
                  {menu.icon}
                </ListItemIcon>

                <ListItemText
                  primary={menu.name}
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
        {/* Invoice & Billing Dropdown */}
        <ListItemButton
          onClick={() => setBillingOpen((prev) => !prev)}
          sx={{
            mb: 1,
            borderRadius: 3,
            backgroundColor: "transparent", // parent doesn't get active style
            color: "#374151",
            "&:hover": { backgroundColor: "#f3f4f6" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "#6b7280" }}>
            <Receipt size={18} />
          </ListItemIcon>
          <ListItemText primary="Invoice & Billing" />
          {billingOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </ListItemButton>

        <Collapse in={billingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {billingItems.map((item) => (
              <NavLink key={item.name} to={item.path} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      pl: 6,
                      mb: 0.5,
                      borderRadius: 2,
                      backgroundColor: isActive ? "#1976d2" : "transparent",
                      color: isActive ? "#fff" : "#374151",
                      "&:hover": { backgroundColor: isActive ? "#1565c0" : "#f3f4f6" },
                    }}
                  >
                    <ListItemIcon
                      sx={{ minWidth: 35, color: isActive ? "#fff" : "#6b7280" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            ))}
          </List>
        </Collapse>

        {/* Logout */}
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <ListItemButton sx={{ mb: 1, borderRadius: 3 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogOut size={18} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
};

export default Sidebar;