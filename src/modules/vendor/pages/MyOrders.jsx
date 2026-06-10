import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
  Container,
  CircularProgress,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import VendorLayout from "../components/VendorLayout";
import { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "default";
  }
};

const MyOrders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/vendor/orders?vendorName=LG",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Map API response to your table format
          const formattedOrders = response.data.data.map((order) => ({
            id: order.id,
            product: order.productName,
            quantity: order.quantity,
            status: order.orderStatus,
            supplier: order.supplierName,
            requestedDate: order.requestedDate,
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <VendorLayout>
        <Container sx={{ py: 5, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Loading orders...</Typography>
        </Container>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
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
            My Orders
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Track your product requests, approval status, and supplier updates.
          </Typography>
        </Box>

        {/* TABLE VIEW (DESKTOP) */}
        {!isMobile && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              border: "1px solid #eef0f4",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
                <TableRow
                  sx={{
                    bgcolor: "primary.main",
                    "& .MuiTableCell-root": {
                      color: "#fff",
                      fontWeight: 600,
                    },
                  }}
                >
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Requested Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {order.requestedDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* MOBILE CARD VIEW */}
        {isMobile && (
          <Stack spacing={2}>
            {orders.map((order) => (
              <Card
                key={order.id}
                sx={{ borderRadius: 3, border: "1px solid #eef0f4" }}
              >
                <CardContent>
                  <Stack spacing={1.2}>
                    <Typography fontWeight={700}>{order.product}</Typography>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {order.quantity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Supplier:</strong> {order.supplier}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Requested:</strong> {order.requestedDate}
                    </Typography>
                    <Box mt={1}>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </VendorLayout>
  );
};

export default MyOrders;