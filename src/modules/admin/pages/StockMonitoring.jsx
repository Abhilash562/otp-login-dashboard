import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

// Dummy stock summary
const stockSummary = [
  {
    label: "Total Products",
    value: 120,
    icon: <Inventory2Icon sx={{ fontSize: 28, color: "primary.main" }} />,
  },
  {
    label: "Low Stock Items",
    value: 8,
    icon: <WarningAmberIcon sx={{ fontSize: 28, color: "warning.main" }} />,
  },
  {
    label: "Out of Stock",
    value: 3,
    icon: <RemoveShoppingCartIcon sx={{ fontSize: 28, color: "error.main" }} />,
  },
  {
    label: "Stock Alerts",
    value: 5,
    icon: <NotificationsActiveIcon sx={{ fontSize: 28, color: "secondary.main" }} />,
  },
];

// Dummy stock table data
const stockData = [
  {
    id: "P001",
    name: "Basmati Rice",
    supplier: "Fresh Farms",
    category: "Grains",
    stock: 120,
    status: "Available",
  },
  {
    id: "P002",
    name: "Organic Tomato",
    supplier: "Green Grocers",
    category: "Vegetables",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "P003",
    name: "Milk Packet",
    supplier: "Daily Dairy",
    category: "Dairy",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "P004",
    name: "Fresh Apple",
    supplier: "Farm Fresh",
    category: "Fruits",
    stock: 60,
    status: "Available",
  },
];

const getStatusChip = (status) => {
  switch (status) {
    case "Available":
      return <Chip label="Available" color="success" size="small" />;
    case "Low Stock":
      return <Chip label="Low Stock" color="warning" size="small" />;
    case "Out of Stock":
      return <Chip label="Out of Stock" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const StockMonitoring = () => {
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
          Stock Monitoring
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Track inventory levels, alerts, and low stock items here.
        </Typography>
      </Box>

      {/* Stock Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {stockSummary.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card elevation={2} sx={{ borderRadius: 3, position: "relative", overflow: "hidden" }}>
              <CardContent sx={{ position: "relative" }}>

                {/* TOP RIGHT ICON */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  }}
                >
                  {item.icon}
                </Box>

                {/* TEXT CONTENT */}
                <Box sx={{ pr: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>

              </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>

      {/* Stock Table */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 3, overflowX: "auto" , mt:3}}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "primary.main",
                "& .MuiTableCell-root": {
                  color: "#fff",
                  fontWeight: 600,
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stockData.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ "&:hover": { bgcolor: "#f8fafc" } }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{getStatusChip(item.status)}</TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Restock
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<RemoveIcon />}
                    >
                      Reduce
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockMonitoring;