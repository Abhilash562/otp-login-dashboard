import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

const stats = [
  { title: "Total Suppliers", value: 120, icon: <PeopleAltOutlinedIcon />, color: "#1976d2" },
  { title: "Total Vendors", value: 80, icon: <LocalShippingOutlinedIcon />, color: "#2e7d32" },
  { title: "Total Products", value: 450, icon: <Inventory2OutlinedIcon />, color: "#9c27b0" },
  { title: "Pending Orders", value: 34, icon: <ShoppingCartOutlinedIcon />, color: "#ed6c02" },
  { title: "Total Stock", value: 1200, icon: <WarehouseOutlinedIcon />, color: "#0288d1" },
  { title: "Recent Activity", value: 15, icon: <TimelineOutlinedIcon />, color: "#d32f2f" },
];

const Dashboard = () => {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="700">
          Overview
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Admin dashboard overview of suppliers, vendors, products and orders
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #eee",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="700" mt={1}>
                      {item.value}
                    </Typography>
                  </Box>

                  <Avatar sx={{ bgcolor: item.color, width: 56, height: 56 }}>
                    {item.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;