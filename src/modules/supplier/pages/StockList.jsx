import SupplierLayout from "../components/SupplierLayout";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  Grid,
  TextField,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const stocks = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Medicine",
    quantity: 320,
    warehouse: "Warehouse A",
    status: "Available",
    progress: 80,
  },
  {
    id: 2,
    name: "Surgical Gloves",
    category: "Medical Supplies",
    quantity: 85,
    warehouse: "Warehouse B",
    status: "Low Stock",
    progress: 35,
  },
  {
    id: 3,
    name: "BP Monitor",
    category: "Equipment",
    quantity: 42,
    warehouse: "Warehouse A",
    status: "Available",
    progress: 70,
  },
  {
    id: 4,
    name: "Face Masks",
    category: "Safety",
    quantity: 500,
    warehouse: "Warehouse C",
    status: "Available",
    progress: 95,
  },
];

const stats = [
  {
    title: "Total Items",
    value: "1,240",
    icon: <Inventory2OutlinedIcon />,
    color: "#1976d2",
  },
  {
    title: "Low Stock",
    value: "08",
    icon: <WarningAmberOutlinedIcon />,
    color: "#ed6c02",
  },
  {
    title: "Delivered",
    value: "320",
    icon: <LocalShippingOutlinedIcon />,
    color: "#2e7d32",
  },
  {
    title: "Available",
    value: "98%",
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: "#9c27b0",
  },
];

const StockList = () => {
  return (
    <SupplierLayout>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Stock Inventory
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Track product availability, warehouse stock, and inventory status.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Add Stock
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 5,
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ mt: 1 }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search products, category, warehouse..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#f9fafb",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Stock List */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Available Stock
          </Typography>

          <Stack spacing={2}>
            {stocks.map((stock) => (
                <Card
                key={stock.id}
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 4,
                    transition: "0.3s",
                    "&:hover": {
                    boxShadow: 3,
                    backgroundColor: "#fafafa",
                    },
                }}
                >
                <CardContent sx={{ py: 2.5 }}>
                    <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                        xs: "1fr",
                        md: "3fr 1fr 1.5fr 1.5fr 1fr",
                        },
                        alignItems: "center",
                        gap: 3,
                    }}
                    >
                    {/* Product Info */}
                    <Box
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                        }}
                    >
                        <Avatar
                        sx={{
                            bgcolor: "#1976d2",
                            width: 52,
                            height: 52,
                        }}
                        >
                        <Inventory2OutlinedIcon />
                        </Avatar>

                        <Box>
                        <Typography fontWeight="bold">
                            {stock.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {stock.category}
                        </Typography>
                        </Box>
                    </Box>

                    {/* Quantity */}
                    <Box textAlign="center">
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        >
                        Quantity
                        </Typography>

                        <Typography fontWeight="600">
                        {stock.quantity}
                        </Typography>
                    </Box>

                    {/* Warehouse */}
                    <Box textAlign="center">
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        >
                        Warehouse
                        </Typography>

                        <Typography fontWeight="600">
                        {stock.warehouse}
                        </Typography>
                    </Box>

                    {/* Stock Level */}
                    <Box>
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 0.8,
                            textAlign: "center",
                        }}
                        >
                        Stock Level
                        </Typography>

                        <LinearProgress
                        variant="determinate"
                        value={stock.progress}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                        }}
                        />
                    </Box>

                    {/* Status */}
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <Chip
                        label={stock.status}
                        color={
                            stock.status === "Low Stock"
                            ? "warning"
                            : "success"
                        }
                        sx={{
                            minWidth: 120,
                            fontWeight: "bold",
                            borderRadius: 2,
                        }}
                        />
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            ))}
            </Stack>
        </CardContent>
      </Card>
    </SupplierLayout>
  );
};

export default StockList;