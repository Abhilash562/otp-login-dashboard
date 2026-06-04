import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Stack,
  Avatar,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

// Function to display status chips
const getStatusChip = (status) => {
  switch (status) {
    case "In Stock":
      return <Chip label="In Stock" color="success" size="small" />;
    case "Out of Stock":
      return <Chip label="Out of Stock" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch("http://localhost:8080/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const formattedProducts = data.data.map((product) => ({
            id: product.id,
            name: product.productName,
            supplier: product.supplierName,
            category: product.category,
            stock: product.stock,
            price: product.price,
            status: product.status,
            image: product.imageUrl,
          }));
          setProducts(formattedProducts);
        }
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
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
        }}
      >
        <Typography variant="h4" fontWeight="700">
          Products Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Manage products, inventory, approvals, and supplier listings.
        </Typography>
      </Box>

      {/* Table */}
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
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{
                  "&:hover": {
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{getStatusChip(product.status)}</TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                    >
                      Approve
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      startIcon={<CancelIcon />}
                    >
                      Reject
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
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

export default Products;