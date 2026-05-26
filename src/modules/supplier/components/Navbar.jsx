import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Stack,
} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Navbar = () => {
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
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "#1976d2",
            }}
          >
            Supplier Dashboard
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mt: 0.3 }}
          >
            Welcome back, manage your inventory efficiently
          </Typography>
        </Box>

        {/* Right Section */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Notifications */}
          <IconButton
            sx={{
              backgroundColor: "#f3f4f6",
              "&:hover": {
                backgroundColor: "#e5e7eb",
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Settings */}
          <IconButton
            sx={{
              backgroundColor: "#f3f4f6",
              "&:hover": {
                backgroundColor: "#e5e7eb",
              },
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
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #1976d2",
              }}
            />

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                fontWeight="bold"
              >
                Abhilash
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "#6b7280" }}
              >
                Supplier
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;