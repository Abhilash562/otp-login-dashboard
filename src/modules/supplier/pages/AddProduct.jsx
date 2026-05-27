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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

/* ================= API ================= */
const API_URL = "http://localhost:8080/product";

/* ================= TABLE ================= */
const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>Product</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Stock</b></TableCell>
            <TableCell><b>Price</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={p.imageUrl} variant="rounded" />
                  <Box>
                    <Typography fontWeight={600}>
                      {p.productName}
                    </Typography>
                    <Typography variant="caption">
                      ID: {p.id}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>

              <TableCell>{p.category}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>₹{p.price}</TableCell>

              <TableCell>
                <Chip
                  label={p.status}
                  color={p.status === "Low Stock" ? "warning" : "success"}
                />
              </TableCell>

              <TableCell align="center">
                <IconButton>
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton onClick={() => onEdit(p)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton onClick={() => onDelete(p.id)} sx={{ color: "red" }}>
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/* ================= MAIN ================= */
const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    status: "",
    image: "",
  });

  /* ================= FETCH (SAFE - NO ESLINT ISSUES) ================= */
  useEffect(() => {

    console.log("fetching");
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(res, "res");
        console.log("header", res.headers);

        const result = await res.json();
        setProducts(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
    const payload = {
      productName: formData.name,
      category: formData.category,
      stock: Number(formData.stock),
      price: Number(formData.price),
      status: formData.status,
      imageUrl: formData.image,
    };

    const url = editingId
      ? `${API_URL}/${editingId}`
      : API_URL;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("api called");

    setOpen(false);
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      status: "",
      image: "",
    });

    // refresh
    const res = await fetch(API_URL, {
      headers: { 'Content-Type': 'application/json', },
    });

    const result = await res.json();
    setProducts(result.data);
  };

  /* ================= EDIT ================= */
  const handleEdit = (p) => {
    setEditingId(p.id);

    setFormData({
      name: p.productName,
      category: p.category,
      stock: p.stock,
      price: p.price,
      status: p.status,
      image: p.imageUrl,
    });

    setOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <SupplierLayout>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ whiteSpace: "nowrap" }}
        >
          Product Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Product
        </Button>
      </Box>

      {/* TABLE */}
      <Card>
        <CardContent>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editingId ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField name="name" label="Name" onChange={handleChange} value={formData.name} />
            <TextField name="category" label="Category" onChange={handleChange} value={formData.category} />
            <TextField name="stock" label="Stock" type="number" onChange={handleChange} value={formData.stock} />
            <TextField name="price" label="Price" type="number" onChange={handleChange} value={formData.price} />
            <TextField name="image" label="Image URL" onChange={handleChange} value={formData.image} />

            <TextField select name="status" label="Status" onChange={handleChange} value={formData.status}>
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </SupplierLayout>
  );
};

export default AddProduct;