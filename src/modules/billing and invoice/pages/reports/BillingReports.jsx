import { useState } from "react";
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
  Stack,
  Button,
  Chip,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Dummy Reports Data
const dummyReports = [
  {
    invoiceNumber: "INV-2026-001",
    vendor: "Vendor A",
    total: 1300,
    status: "Draft",
    invoiceDate: "2026-06-01",
    dueDate: "2026-06-10",
  },
  {
    invoiceNumber: "INV-2026-002",
    vendor: "Vendor B",
    total: 3100,
    status: "Sent",
    invoiceDate: "2026-06-03",
    dueDate: "2026-06-12",
  },
  {
    invoiceNumber: "INV-2026-003",
    vendor: "Vendor C",
    total: 1650,
    status: "Paid",
    invoiceDate: "2026-06-05",
    dueDate: "2026-06-15",
  },
];

// Status Color Helper
const getStatusColor = (status) => {
  switch (status) {
    case "Draft":
      return "default";
    case "Sent":
      return "info";
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

// PDF Download
const downloadReportPDF = (reports) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice Reports", 14, 20);

  const columns = [
    "Invoice No",
    "Vendor",
    "Total",
    "Status",
    "Invoice Date",
    "Due Date",
  ];

  const rows = reports.map((r) => [
    r.invoiceNumber,
    r.vendor,
    `Rs. ${r.total.toLocaleString()}`,
    r.status,
    r.invoiceDate,
    r.dueDate,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: rows,
  });

  doc.save("InvoiceReports.pdf");
};

const BillingReports = () => {
  const [reports] = useState(dummyReports);

  // Summary
  const totalInvoices = reports.length;
  const paidInvoices = reports.filter((r) => r.status === "Paid").length;
  const pendingInvoices = reports.filter((r) => r.status === "Pending").length;
  const overdueInvoices = reports.filter((r) => r.status === "Overdue").length;

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
          Reports
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          View summary and detailed invoice reports
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={5}>
        {[
          { label: "Total Invoices", value: totalInvoices },
          { label: "Paid Invoices", value: paidInvoices },
          { label: "Pending Invoices", value: pendingInvoices },
          { label: "Overdue Invoices", value: overdueInvoices },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card
              sx={{
                borderRadius: 3,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Reports Table */}
      <Card sx={{ borderRadius: 3, mt: 2 }}>
        <CardContent sx={{ p: 3 }}>
          
          {/* Header + Button */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="600">
              Invoice Reports
            </Typography>

            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
              onClick={() => downloadReportPDF(reports)}
            >
              Download PDF
            </Button>
          </Stack>

          {/* Table */}
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f0f0f0" }}>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Invoice Date</TableCell>
                    <TableCell>Due Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {reports.map((r) => (
                    <TableRow key={r.invoiceNumber} hover>
                      <TableCell>{r.invoiceNumber}</TableCell>
                      <TableCell>{r.vendor}</TableCell>
                      <TableCell>Rs. {r.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={r.status}
                          color={getStatusColor(r.status)}
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </TableCell>
                      <TableCell>{r.invoiceDate}</TableCell>
                      <TableCell>{r.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingReports;