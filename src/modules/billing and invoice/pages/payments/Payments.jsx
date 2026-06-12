import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

// Dummy Payment Data
const dummyPayments = [
  {
    id: "PAY-1001",
    invoice: "INV-2026-001",
    customer: "ABC Traders",
    amount: 12000,
    method: "UPI",
    status: "Paid",
    date: "2026-06-01",
    transactionId: "TXN987654",
  },
  {
    id: "PAY-1002",
    invoice: "INV-2026-002",
    customer: "Global Supplies",
    amount: 8500,
    method: "Bank Transfer",
    status: "Pending",
    date: "2026-06-03",
    transactionId: "TXN987655",
  },
  {
    id: "PAY-1003",
    invoice: "INV-2026-003",
    customer: "Sunrise Enterprises",
    amount: 15400,
    method: "Credit Card",
    status: "Failed",
    date: "2026-06-04",
    transactionId: "TXN987656",
  },
  {
    id: "PAY-1004",
    invoice: "INV-2026-004",
    customer: "TechMart",
    amount: 6200,
    method: "UPI",
    status: "Paid",
    date: "2026-06-06",
    transactionId: "TXN987657",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Pending":
      return "warning";
    case "Failed":
      return "error";
    default:
      return "default";
  }
};

const Payments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = dummyPayments.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.invoice.toLowerCase().includes(search.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
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
            Payments
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 1 }}
          >
            Manage payment history, status tracking, and transactions
          </Typography>
        </Box>

      {/* Filters */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Search Payments"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, invoice, transaction ID..."
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f0f0f0" }}>
                  <TableCell><b>Payment ID</b></TableCell>
                  <TableCell><b>Invoice</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Amount (₹)</b></TableCell>
                  <TableCell><b>Method</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Transaction ID</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPayments.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.invoice}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>₹{row.amount.toLocaleString()}</TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.transactionId}</TableCell>
                  </TableRow>
                ))}

                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payments;