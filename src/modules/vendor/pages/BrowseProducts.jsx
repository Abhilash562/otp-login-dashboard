import { useState, useEffect } from "react";
import axios from "axios";
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
  Avatar,
  Chip,
  Button,
  Stack,
  IconButton,
  Card,
  CardContent,
  useMediaQuery,
  Container,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VendorLayout from "../components/VendorLayout";

const getStatusColor = (status) => {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "warning";
    case "Out of Stock":
      return "error";
    default:
      return "default";
  }
};

const BrowseProducts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (product) => {
    console.log("View:", product);
  };

  const handleRequest = (product) => {
    console.log("Request:", product);
  };

  if (loading) {
    return (
      <VendorLayout>
        <Container
          sx={{
            py: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
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
            Browse Products
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 1 }}
          >
            Explore your inventory, check stock levels, and
            request products as needed.
          </Typography>
        </Box>

        {/* Desktop Table */}
        {!isMobile && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              border: "1px solid #eef0f4",
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
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <Avatar
                          src={product.imageUrl}
                          alt={product.productName}
                          variant="rounded"
                        />
                        <Typography fontWeight={500}>
                          {product.productName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {product.category}
                    </TableCell>

                    <TableCell>
                      {product.stock}
                    </TableCell>

                    <TableCell>
                      ₹{product.price}
                    </TableCell>

                    <TableCell>
                      {product.supplierName}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={product.status}
                        color={getStatusColor(
                          product.status
                        )}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleView(product)
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <Button
                          variant="contained"
                          size="small"
                          startIcon={
                            <ShoppingCartIcon />
                          }
                          onClick={() =>
                            handleRequest(product)
                          }
                          disabled={
                            product.status ===
                            "Out of Stock"
                          }
                        >
                          Request
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {products.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                    >
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Mobile Cards */}
        {isMobile && (
          <Stack spacing={2}>
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #eef0f4",
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      src={product.imageUrl}
                      alt={product.productName}
                      variant="rounded"
                    />

                    <Box flex={1}>
                      <Typography fontWeight={600}>
                        {product.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {product.category}
                      </Typography>
                    </Box>

                    <Chip
                      label={product.status}
                      color={getStatusColor(
                        product.status
                      )}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Stack>

                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                    >
                      <strong>Stock:</strong>{" "}
                      {product.stock}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                    >
                      <strong>Price:</strong> ₹
                      {product.price}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Supplier:</strong>{" "}
                      {product.supplierName}
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    mt={2}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={
                        <VisibilityIcon />
                      }
                      onClick={() =>
                        handleView(product)
                      }
                    >
                      View
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={
                        <ShoppingCartIcon />
                      }
                      onClick={() =>
                        handleRequest(product)
                      }
                      disabled={
                        product.status ===
                        "Out of Stock"
                      }
                    >
                      Request
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            {products.length === 0 && (
              <Typography align="center">
                No products found
              </Typography>
            )}
          </Stack>
        )}
      </Container>
    </VendorLayout>
  );
};

export default BrowseProducts;
