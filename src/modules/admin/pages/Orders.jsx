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
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Helper to display colored status chips
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
    case "APPROVED":
      return <Chip label="Approved" color="primary" size="small" />;
    case "REJECTED":
      return <Chip label="Rejected" color="error" size="small" />;
    case "COMPLETED":
      return <Chip label="Completed" color="success" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

// Component for action buttons
const OrderActions = ({ order, onView, onUpdateStatus, onCancel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async (status) => {
    setAnchorEl(null);
    if (status) {
      await onUpdateStatus(order.id, status); // Call API
    }
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {/* View Button */}
      <Button
        variant="outlined"
        size="small"
        startIcon={<VisibilityIcon />}
        onClick={() => onView(order.id)}
      >
        View
      </Button>

      {/* Update Status Dropdown */}
      <Button
        variant="contained"
        color="info"
        size="small"
        onClick={handleMenuClick}
        disabled={
          order.orderStatus === "COMPLETED" ||
          order.orderStatus === "CANCELLED"
        }
      >
        Update Status
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleMenuClose()}
      >
        {["PENDING", "APPROVED", "REJECTED", "COMPLETED"].map(
          (status) => (
            <MenuItem key={status} onClick={() => handleMenuClose(status)}>
              {status}
            </MenuItem>
          )
        )}
      </Menu>

      {/* Cancel Order */}
      <Tooltip
        title={
          order.orderStatus !== "PENDING"
            ? "Only pending orders can be cancelled"
            : "Cancel Order"
        }
      >
        <span>
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={order.orderStatus !== "PENDING"}
            onClick={() => onCancel(order.id)}
          >
            Cancel Order
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch orders from API
  const fetchOrders = () => {
    setLoading(true);
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
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handler functions
  const handleView = (id) => {
    console.log("View order:", id);
    // Implement view logic (modal/navigation)
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/orders/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        console.log("Status updated:", data.message);
        fetchOrders(); // Refresh table
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        console.log("Order cancelled:", data.message);
        fetchOrders(); // Refresh table
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

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
    <Box p={2}>
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
                <TableCell>{getStatusChip(order.orderStatus)}</TableCell>
                <TableCell>{order.requestedDate}</TableCell>
                <TableCell>
                  <OrderActions
                    order={order}
                    onView={handleView}
                    onUpdateStatus={handleUpdateStatus}
                    onCancel={handleCancel}
                  />
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