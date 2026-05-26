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
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const products = [
  {
    id: 1,
    image:
      "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
    name: "Paracetamol 500mg",
    category: "Medicine",
    stock: 320,
    status: "In Stock",
    price: "₹120",
  },
  {
    id: 2,
    image:
      "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
    name: "Surgical Gloves",
    category: "Medical Supplies",
    stock: 85,
    status: "Low Stock",
    price: "₹450",
  },
  {
    id: 3,
    image:
      "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    name: "BP Monitor",
    category: "Equipment",
    stock: 42,
    status: "In Stock",
    price: "₹2,200",
  },
  {
    id: 4,
    image:
      "https://cdn-icons-png.flaticon.com/512/2785/2785819.png",
    name: "Face Masks",
    category: "Safety",
    stock: 500,
    status: "In Stock",
    price: "₹350",
  },
];

const stats = [
  {
    title: "Total Products",
    value: "120",
    icon: <Inventory2OutlinedIcon />,
    color: "#1976d2",
  },
  {
    title: "Pending Deliveries",
    value: "18",
    icon: <LocalShippingOutlinedIcon />,
    color: "#2e7d32",
  },
  {
    title: "Low Stock Items",
    value: "06",
    icon: <WarningAmberOutlinedIcon />,
    color: "#ed6c02",
  },
];

/* =========================
   Reusable Product Table
========================= */
const ProductTable = ({ products }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f8fafc",
            }}
          >
            <TableCell sx={{ fontWeight: "bold" }}>
              Product
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Category
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Stock
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Price
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Status
            </TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              hover
              sx={{
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
            >
              {/* Product Info */}
              <TableCell>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    src={product.image}
                    variant="rounded"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                    }}
                  />

                  <Box>
                    <Typography fontWeight="600">
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Product ID: #{product.id}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Typography fontWeight="500">
                  {product.category}
                </Typography>
              </TableCell>

              {/* Stock */}
              <TableCell>
                <Typography fontWeight="600">
                  {product.stock}
                </Typography>
              </TableCell>

              {/* Price */}
              <TableCell>
                <Typography fontWeight="600">
                  {product.price}
                </Typography>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Chip
                  label={product.status}
                  color={
                    product.status === "Low Stock"
                      ? "warning"
                      : "success"
                  }
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                    minWidth: 110,
                  }}
                />
              </TableCell>

              {/* Actions */}
              <TableCell align="center">
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                >
                  <IconButton
                    sx={{
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <VisibilityOutlinedIcon
                      fontSize="small"
                    />
                  </IconButton>

                  <IconButton
                    sx={{
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{
                      border: "1px solid #e5e7eb",
                      color: "#d32f2f",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AddProduct = () => {
  return (
    <SupplierLayout>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Products Management
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage inventory, stock availability,
            and product listings.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Add New Product
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 5,
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ mt: 1 }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Table */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Product Inventory
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              View All
            </Button>
          </Box>

          <ProductTable products={products} />
        </CardContent>
      </Card>
    </SupplierLayout>
  );
};

export default AddProduct;