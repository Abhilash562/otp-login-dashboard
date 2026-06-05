import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  Divider,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputAdornment from "@mui/material/InputAdornment";

const API_BASE = "http://localhost:8080";
const token = localStorage.getItem("token");

const StatCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      borderRadius: 3,
      height: "100%",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
    }}
  >
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} mt={0.5}>
            {value ?? 0}
          </Typography>
        </Box>

        <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
      </Stack>
    </CardContent>
  </Card>
);

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [salesSummary, setSalesSummary] = useState(null);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      const [summaryRes, topProductsRes, salesRes] = await Promise.all([
        axios.get(`${API_BASE}/reports/summary`, { headers }),
        axios.get(`${API_BASE}/reports/top-products`, { headers }),
        axios.get(`${API_BASE}/reports/sales-summary`, { headers }),
      ]);

      setSummary(summaryRes.data?.data);
      setTopProducts(topProductsRes.data?.data || []);
      setSalesSummary(salesRes.data?.data);
    } catch (err) {
      console.error("Reports API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredProducts = useMemo(() => {
    return topProducts.filter((item) =>
      item.productName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [topProducts, search]);

  const exportCSV = () => {
    const rows = [
      ["REPORT SUMMARY"],
      ["Total Orders", summary?.totalOrders ?? 0],
      ["Completed Orders", summary?.completedOrders ?? 0],
      ["Pending Orders", summary?.pendingOrders ?? 0],
      ["Approved Orders", summary?.approvedOrders ?? 0],
      ["Cancelled Orders", summary?.cancelledOrders ?? 0],
      ["Rejected Orders", summary?.rejectedOrders ?? 0],
      [],
      ["SALES SUMMARY"],
      ["Total Completed Orders", salesSummary?.totalCompletedOrders ?? 0],
      ["Average Order Value", salesSummary?.averageOrderValue ?? 0],
      ["Total Sales Quantity", salesSummary?.totalSalesQuantity ?? 0],
      [],
      ["TOP PRODUCTS"],
      ["Product Name", "Total Orders"],
      ...topProducts.map((p) => [p.productName, p.totalOrders]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <Box height="80vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

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
            boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
        }}
        >
        <Typography variant="h4" fontWeight="700">
            Reports Dashboard
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Track orders, sales performance, and top products analytics in real time.
        </Typography>
      </Box>           

      {/* KPI Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Orders"
            value={summary?.totalOrders}
            icon={<ShoppingCartIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Completed Orders"
            value={summary?.completedOrders}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Pending Orders"
            value={summary?.pendingOrders}
            icon={<PendingIcon />}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Approved Orders"
            value={summary?.approvedOrders}
            icon={<CheckCircleIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Filters */}
      <Card
        sx={{
            mt: 3,
            mb: 3,
            borderRadius: 4,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
        }}
        >
        <CardContent>
            <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            alignItems="center"
            >
            {/* Search */}
            <TextField
                fullWidth
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
            />

            {/* Date */}
            <TextField
                sx={{ minWidth: 220 }}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <CalendarMonthIcon />
                    </InputAdornment>
                ),
                }}
            />

            {/* Export */}
            <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportCSV}
                sx={{
                height: 56,
                minWidth: 150,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(25,118,210,0.3)",
                }}
            >
                Export CSV
            </Button>
            </Stack>
        </CardContent>
        </Card>

      {/* Top Products */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Top Products
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Orders</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{p.productName}</TableCell>
                    <TableCell>{p.totalOrders}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sales Summary */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Sales Summary
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Typography>
              Total Completed Orders:{" "}
              <b>{salesSummary?.totalCompletedOrders ?? 0}</b>
            </Typography>

            <Typography>
              Average Order Value:{" "}
              <b>₹{salesSummary?.averageOrderValue ?? 0}</b>
            </Typography>

            <Typography>
              Total Sales Quantity:{" "}
              <b>{salesSummary?.totalSalesQuantity ?? 0}</b>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;