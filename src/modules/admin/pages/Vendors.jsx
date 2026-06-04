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
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

// Function to display colored status chips
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

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch("http://localhost:8080/vendors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          // Map API response to table-friendly format
          const formattedVendors = data.data.map((vendor) => ({
            id: vendor.uniqueUserId,
            name: vendor.name,
            business: vendor.businessName,
            mobile: vendor.mobileNumber,
            location: vendor.location,
            status: vendor.status,
          }));
          setVendors(formattedVendors);
        }
      })
      .catch((err) => console.error("Error fetching vendors:", err))
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
          Vendors Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Manage vendor accounts and their active/inactive status.
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vendors.map((vendor) => (
              <TableRow
                key={vendor.id}
                hover
                sx={{
                  "&:hover": {
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                <TableCell>{vendor.id}</TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.business}</TableCell>
                <TableCell>{vendor.mobile}</TableCell>
                <TableCell>{vendor.location}</TableCell>
                <TableCell>{getStatusChip(vendor.status)}</TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                    >
                      Activate
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
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

export default Vendors;