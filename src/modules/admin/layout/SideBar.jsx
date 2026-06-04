import { NavLink } from "react-router-dom";

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
} from "@mui/material";

import {
  Dashboard,
  People,
  Store,
  Inventory,
  ShoppingCart,
  Assessment,
  Person,
} from "@mui/icons-material";
import { LogOut } from "lucide-react";

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
    name: "Logout",
    path: "/login",
    icon: <LogOut size={18} />,
  },
];

const Sidebar = () => {
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
      </List>
    </Box>
  );
};

export default Sidebar;