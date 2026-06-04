import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

const getStatusChip = (status) => {
  switch (status) {
    case "ACTIVE":
      return <Chip label="Active" color="success" size="small" />;
    case "INACTIVE":
      return <Chip label="Inactive" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace token with your actual Bearer token
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/suppliers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          // Map API response to the table format
          const formattedSuppliers = data.data.map((supplier) => ({
            id: supplier.uniqueUserId,
            name: supplier.name,
            business: supplier.businessName,
            mobile: supplier.mobileNumber,
            location: supplier.location,
            status: supplier.status,
          }));
          setSuppliers(formattedSuppliers);
        }
      })
      .catch((err) => console.error("Error fetching suppliers:", err))
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
          Suppliers Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Manage supplier status and business details.
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          mt: 3,
          borderRadius: 3,
          overflow: "hidden",
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
              <TableCell>Supplier ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                hover
                sx={{
                  "&:hover": {
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.business}</TableCell>
                <TableCell>{supplier.mobile}</TableCell>
                <TableCell>{supplier.location}</TableCell>
                <TableCell>{getStatusChip(supplier.status)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} justifyContent="center">
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
                      Activate
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<BlockIcon />}
                    >
                      Deactivate
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

export default Suppliers;