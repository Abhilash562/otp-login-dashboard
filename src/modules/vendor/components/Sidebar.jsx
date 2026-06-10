import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

const menus = [
  {
    name: "Dashboard",
    path: "/vendor/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Browse Products",
    path: "/vendor/browse-products",
    icon: <Package size={18} />,
  },
  {
    name: "My Orders",
    path: "/vendor/my-orders",
    icon: <PlusSquare size={18} />,
  },
  {
    name: "Request Product",
    path: "/vendor/request-product",
    icon: <ClipboardList size={18} />,
  },
  {
    name: "Profile",
    path: "/vendor/profile",
    icon: <User size={18} />,
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
            V
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Vendor Panel
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