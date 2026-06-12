import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case "DRAFT":
      return "default";
    case "SENT":
      return "info";
    case "PAID":
      return "success";
    case "PENDING":
      return "warning";
    case "OVERDUE":
      return "error";
    default:
      return "default";
  }
};

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form state
  const [form, setForm] = useState({
    vendor: "",
    supplier: "",
    products: [{ name: "", qty: 1, price: 0 }],
    tax: 0,
    invoiceDate: "",
    dueDate: "",
    status: "DRAFT",
  });

  const API_URL = "http://localhost:8080/api/invoices";
  const TOKEN = localStorage.getItem("token"); // replace with your token

  // Fetch invoices from API
  const fetchInvoices = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        const formattedInvoices = data.data.map((inv) => ({
          invoiceNumber: inv.invoiceNumber,
          vendor: inv.vendorName,
          supplier: inv.supplierName,
          products: inv.items.map((item) => ({
            name: item.productName,
            qty: item.quantity,
            price: item.price,
          })),
          tax: inv.tax,
          total: inv.totalAmount,
          invoiceDate: inv.invoiceDate,
          dueDate: inv.dueDate,
          status: inv.status,
        }));
        setInvoices(formattedInvoices);
      }
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", qty: 1, price: 0 }],
    }));
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...form.products];
    newProducts[index][field] =
      field === "qty" || field === "price" ? Number(value) : value;
    setForm((prev) => ({ ...prev, products: newProducts }));
  };

  const calculateTotal = () => {
    const subtotal = form.products.reduce(
      (acc, p) => acc + p.qty * p.price,
      0
    );
    return subtotal + Number(form.tax);
  };

  // Create invoice via API
  const handleCreateInvoice = async () => {
    const payload = {
      vendorName: form.vendor,
      supplierName: form.supplier,
      items: form.products.map((p) => ({
        productName: p.name,
        quantity: p.qty,
        price: p.price,
      })),
      tax: form.tax,
      invoiceDate: form.invoiceDate,
      dueDate: form.dueDate,
      status: form.status.toUpperCase(),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        const inv = data.data;
        const newInvoice = {
          invoiceNumber: inv.invoiceNumber,
          vendor: inv.vendorName,
          supplier: inv.supplierName,
          products: inv.items.map((item) => ({
            name: item.productName,
            qty: item.quantity,
            price: item.price,
          })),
          tax: inv.tax,
          total: inv.totalAmount,
          invoiceDate: inv.invoiceDate,
          dueDate: inv.dueDate,
          status: inv.status,
        };
        setInvoices((prev) => [...prev, newInvoice]);
        // Reset form
        setForm({
          vendor: "",
          supplier: "",
          products: [{ name: "", qty: 1, price: 0 }],
          tax: 0,
          invoiceDate: "",
          dueDate: "",
          status: "DRAFT",
        });
      } else {
        console.error("Failed to create invoice:", data.message);
      }
    } catch (err) {
      console.error("Error creating invoice:", err);
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedInvoice(null);
  };

  const handleDownloadInvoice = (invoice) => {
    if (!invoice) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 30);
    doc.text(`Vendor: ${invoice.vendor}`, 14, 36);
    doc.text(`Supplier: ${invoice.supplier}`, 14, 42);
    doc.text(`Status: ${invoice.status}`, 14, 48);
    doc.text(`Invoice Date: ${invoice.invoiceDate}`, 14, 54);
    doc.text(`Due Date: ${invoice.dueDate}`, 14, 60);

    const tableColumn = ["Product", "Qty", "Price", "Total"];
    const tableRows = invoice.products.map((item) => [
      item.name,
      item.qty,
      `₹${item.price.toLocaleString()}`,
      `₹${(item.qty * item.price).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

    const finalY = doc.lastAutoTable.finalY || 90;
    doc.text(`Tax: ₹${invoice.tax.toLocaleString()}`, 14, finalY + 10);
    doc.text(`Total Amount: ₹${invoice.total.toLocaleString()}`, 14, finalY + 18);

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
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
          Invoices
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Create, view, and manage invoices professionally
        </Typography>
      </Box>

      {/* Create Invoice Form */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create Invoice
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vendor Name"
                name="vendor"
                value={form.vendor}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier Name"
                name="supplier"
                value={form.supplier}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" mb={1}>
                Products
              </Typography>
              {form.products.map((product, idx) => (
                <Stack direction="row" spacing={2} mb={1} key={idx}>
                  <TextField
                    label="Product Name"
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(idx, "name", e.target.value)
                    }
                  />
                  <TextField
                    type="number"
                    label="Quantity"
                    value={product.qty}
                    onChange={(e) =>
                      handleProductChange(idx, "qty", e.target.value)
                    }
                  />
                  <TextField
                    type="number"
                    label="Price"
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(idx, "price", e.target.value)
                    }
                  />
                </Stack>
              ))}
              <Button size="small" onClick={handleAddProduct}>
                + Add Product
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Tax"
                name="tax"
                value={form.tax}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Invoice Date"
                name="invoiceDate"
                InputLabelProps={{ shrink: true }}
                value={form.invoiceDate}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                InputLabelProps={{ shrink: true }}
                value={form.dueDate}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={form.status}
                onChange={handleFormChange}
              >
                {["DRAFT", "SENT", "PAID", "PENDING", "OVERDUE"].map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleCreateInvoice}>
                Create Invoice
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Invoice List Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Invoice List
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f0f0f0" }}>
                  <TableCell><b>Invoice Number</b></TableCell>
                  <TableCell><b>Vendor</b></TableCell>
                  <TableCell><b>Supplier</b></TableCell>
                  <TableCell><b>Total Amount (₹)</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Invoice Date</b></TableCell>
                  <TableCell><b>Due Date</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.invoiceNumber} hover>
                    <TableCell>{inv.invoiceNumber}</TableCell>
                    <TableCell>{inv.vendor}</TableCell>
                    <TableCell>{inv.supplier}</TableCell>
                    <TableCell>₹{inv.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={inv.status}
                        color={getStatusColor(inv.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>{inv.invoiceDate}</TableCell>
                    <TableCell>{inv.dueDate}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewInvoice(inv)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleDownloadInvoice(inv)}
                        >
                          Download
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* View Invoice Dialog */}
      <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box>
              <Typography><b>Invoice Number:</b> {selectedInvoice.invoiceNumber}</Typography>
              <Typography><b>Vendor:</b> {selectedInvoice.vendor}</Typography>
              <Typography><b>Supplier:</b> {selectedInvoice.supplier}</Typography>
              <Typography><b>Status:</b> {selectedInvoice.status}</Typography>
              <Typography><b>Invoice Date:</b> {selectedInvoice.invoiceDate}</Typography>
              <Typography><b>Due Date:</b> {selectedInvoice.dueDate}</Typography>
              <Typography variant="subtitle2" mt={2}>Products:</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedInvoice.products.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.qty}</TableCell>
                      <TableCell>₹{p.price.toLocaleString()}</TableCell>
                      <TableCell>₹{(p.qty * p.price).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3}><b>Tax</b></TableCell>
                    <TableCell>₹{selectedInvoice.tax.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}><b>Total</b></TableCell>
                    <TableCell>₹{selectedInvoice.total.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
          <Button variant="contained" onClick={() => handleDownloadInvoice(selectedInvoice)}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoice;