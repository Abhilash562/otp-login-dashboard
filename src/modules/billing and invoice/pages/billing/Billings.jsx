import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

// Dummy Billing Data
const dummyBilling = [
  {
    invoice: "INV-2026-001",
    customer: "ABC Traders",
    amount: 12000,
    status: "Paid",
    dueDate: "2026-06-10",
  },
  {
    invoice: "INV-2026-002",
    customer: "Global Supplies",
    amount: 8500,
    status: "Pending",
    dueDate: "2026-06-12",
  },
  {
    invoice: "INV-2026-003",
    customer: "Sunrise Enterprises",
    amount: 15400,
    status: "Overdue",
    dueDate: "2026-05-30",
  },
  {
    invoice: "INV-2026-004",
    customer: "TechMart",
    amount: 6200,
    status: "Paid",
    dueDate: "2026-06-15",
  },
];

// Helper to determine chip color
const getStatusColor = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Pending":
      return "warning";
    case "Overdue":
      return "error";
    default:
      return "default";
  }
};

// Calculate summary totals
const calculateSummary = (data) => {
  const summary = {
    totalRevenue: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
  };
  data.forEach((item) => {
    summary.totalRevenue += item.amount;
    if (item.status === "Paid") summary.paid += item.amount;
    if (item.status === "Pending") summary.pending += item.amount;
    if (item.status === "Overdue") summary.overdue += item.amount;
  });
  return summary;
};

const Billings = () => {
  const summary = calculateSummary(dummyBilling);

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
            Billings
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 1 }}
          >
            Overview of billing status, revenue, and outstanding payments
          </Typography>
        </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ₹{summary.totalRevenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Paid Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ₹{summary.paid.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ₹{summary.pending.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Overdue Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="error">
                ₹{summary.overdue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Billing Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f0f0f0" }}>
                  <TableCell><b>Invoice</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Amount (₹)</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Due Date</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dummyBilling.map((row) => (
                  <TableRow key={row.invoice} hover>
                    <TableCell>{row.invoice}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>₹{row.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Billings;