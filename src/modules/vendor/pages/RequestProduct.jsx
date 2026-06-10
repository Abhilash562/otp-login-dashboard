import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VendorLayout from "../components/VendorLayout";

const RequestProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    notes: "",
  });

  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  // FIXED: proper type handling
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "productId"
          ? value === "" ? "" : Number(value) // convert to number
          : value,
    }));
  };

  const handleSubmit = async () => {
    const selectedProduct = products.find(
        (p) => p.id === form.productId
    );

    if (!selectedProduct) return;

    try {
        const response = await fetch(
        `http://localhost:8080/vendor/request?vendorName=Abhishek`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            productId: selectedProduct.id,
            quantity: Number(form.quantity),
            message: form.notes,
            }),
        }
        );

        const result = await response.json();

        console.log("API RESPONSE:", result);

        if (result.success) {
        alert("Product request sent successfully!");

        // reset form
        setForm({
            productId: "",
            quantity: 1,
            notes: "",
        });

        setOpen(false);

        // Optional: log or store the newly created request
        console.log("Created Request:", result.data);
        } else {
        alert("Failed to send request: " + result.message);
        }
    } catch (error) {
        console.error("Error sending request:", error);
        alert("Something went wrong while sending request.");
    }
    };

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
          <Typography variant="h4" fontWeight={700}>
            Request Product
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Submit product requests to your suppliers efficiently.
          </Typography>
        </Box>

        {/* Info Card */}
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Select a product and send a request to supplier.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => setOpen(true)}
              disabled={products.length === 0}
            >
              Create Request
            </Button>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
          fullScreen={isMobile}
        >
          <DialogTitle>Product Request Form</DialogTitle>

          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* PRODUCT DROPDOWN */}
              <TextField
                select
                label="Product Name"
                name="productId"
                value={form.productId}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  Select a product
                </MenuItem>

                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.productName}
                  </MenuItem>
                ))}
              </TextField>

              {/* QUANTITY */}
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                fullWidth
                inputProps={{ min: 1 }}
              />

              {/* NOTES */}
              <TextField
                label="Notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!form.productId || form.quantity <= 0}
            >
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </VendorLayout>
  );
};

export default RequestProduct;