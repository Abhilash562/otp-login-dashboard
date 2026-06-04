import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

const getStatusChip = (status) => {
  switch (status) {
    case "DELIVERED":
      return <Chip label="Delivered" color="success" size="small" />;
    case "SHIPPED":
      return <Chip label="Shipped" color="info" size="small" />;
    case "PENDING":
      return <Chip label="Pending" color="warning" size="small" />;
    case "CANCELLED":
      return <Chip label="Cancelled" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch("http://localhost:8080/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* HEADER */}
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
          Orders Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Track vendor orders, status updates, and deliveries.
        </Typography>
      </Box>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 3,
          overflowX: "auto",
        }}
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
              <TableCell>Order ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>{order.supplierName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>

                <TableCell>
                  {getStatusChip(order.orderStatus)}
                </TableCell>

                <TableCell>{order.requestedDate}</TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                    >
                      View
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

export default Orders;