import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Stack,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import axios from "axios";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token"); // Replace with your token or use context/auth

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/notifications/ADMIN", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Badge count = unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handlers for Menu
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
        color: "#111827",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          py: 1,
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976d2" }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.3 }}>
            Welcome back, manage your inventory efficiently
          </Typography>
        </Box>

        {/* Right Section */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Notifications */}
          <IconButton
            sx={{
              backgroundColor: "#f3f4f6",
              "&:hover": { backgroundColor: "#e5e7eb" },
            }}
            onClick={handleOpen}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Notification Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {notifications.length === 0 && (
              <MenuItem disabled>No notifications</MenuItem>
            )}
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                sx={{
                  backgroundColor: notification.isRead ? "#fff" : "#e5f3ff",
                }}
              >
                <ListItemText
                  primary={notification.title}
                  secondary={notification.message}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* Settings */}
          <IconButton
            sx={{
              backgroundColor: "#f3f4f6",
              "&:hover": { backgroundColor: "#e5e7eb" },
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>

          {/* Profile */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.7,
              borderRadius: 3,
              backgroundColor: "#f9fafb",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40"
              alt="profile"
              sx={{ width: 40, height: 40, border: "2px solid #1976d2" }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight="bold">
                Abhilash
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                Admin
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;