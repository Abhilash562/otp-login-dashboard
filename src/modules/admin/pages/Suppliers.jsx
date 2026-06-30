import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  Button,
  Chip,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

const API = "http://localhost:8080";

export default function SupplierVerificationAdmin() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState([]);
  const [docOpen, setDocOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ======================
  // FETCH SUPPLIERS
  // ======================
  useEffect(() => {
    fetch(`${API}/api/admin/verification/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        const mapped = res.data.map((s) => ({
          id: s.supplierId,
          name: s.ownerName,
          business: s.businessName,
          email: s.email,
          mobile: s.mobileNumber,
          status: s.verificationStatus,
        }));

        setSuppliers(mapped);
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to load suppliers",
          severity: "error",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  // ======================
  // DOCUMENTS API
  // ======================
  const viewDocuments = (supplierId) => {
    setSelectedSupplierId(supplierId);

    fetch(`${API}/api/supplier/documents/${supplierId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setDocuments(res.data || []);
        setDocOpen(true);
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to load documents",
          severity: "error",
        })
      );
  };

  // ======================
  // SNACKBAR CLOSE
  // ======================
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // ======================
  // ACTION MAP
  // ======================
  const ACTION_MAP = {
    APPROVE: "APPROVED",
    REJECT: "REJECTED",
    RESUBMIT: "RESUBMISSION_REQUESTED",
  };

  // ======================
  // ACTION HANDLER
  // ======================
  const handleAction = async (action, supplier) => {
    const backendAction = ACTION_MAP[action];
    if (!backendAction) return;

    try {
      const res = await fetch(
        `${API}/api/admin/verification/${supplier.id}/status?action=${backendAction}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        setSuppliers((prev) =>
          prev.map((s) =>
            s.id === supplier.id
              ? { ...s, status: backendAction }
              : s
          )
        );

        setSnackbar({
          open: true,
          message: result.message || "Status updated successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Update failed",
          severity: "error",
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        severity: "error",
      });
    }
  };

  // ======================
  // STATUS CHIP
  // ======================
  const statusChip = (status) => {
    const map = {
      PENDING: { color: "warning", label: "Pending" },
      UNDER_REVIEW: { color: "info", label: "Under Review" },
      APPROVED: { color: "success", label: "Approved" },
      REJECTED: { color: "error", label: "Rejected" },
      RESUBMISSION_REQUESTED: {
        color: "secondary",
        label: "Resubmission",
      },
    };

    const s = map[status] || { color: "default", label: status };

    return (
      <Chip label={s.label} color={s.color} size="small" />
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          p: 2.5,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
          Supplier Verification
        </Typography>
        <Typography variant="body2">
          Manage supplier onboarding & verification workflow
        </Typography>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["ID", "Business", "Owner", "Email", "Status", "Actions"].map((h) => (
                <TableCell key={h} sx={{ bgcolor: "primary.main", color: "#fff" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {suppliers.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.business}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{statusChip(s.status)}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => viewDocuments(s.id)}
                    >
                      Documents
                    </Button>

                    <FormControl size="small">
                      <Select
                        displayEmpty
                        value=""
                        onChange={(e) => handleAction(e.target.value, s)}
                      >
                        <MenuItem disabled value="">
                          Actions
                        </MenuItem>
                        <MenuItem value="APPROVE">Approve</MenuItem>
                        <MenuItem value="REJECT">Reject</MenuItem>
                        <MenuItem value="RESUBMIT">Resubmission</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DOCUMENT DIALOG */}
      <Dialog open={docOpen} onClose={() => setDocOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Supplier Documents - {selectedSupplierId}</DialogTitle>
        <DialogContent>
          {documents.map((doc) => (
            <Box key={doc.id} sx={{ p: 2, mb: 2, border: "1px solid #eee" }}>
              <Typography><b>Type:</b> {doc.documentType}</Typography>
              <Typography><b>Uploaded:</b> {doc.uploadedAt}</Typography>

              <Button
                sx={{ mt: 1 }}
                variant="contained"
                href={`${API}/${doc.filePath}`}
                target="_blank"
              >
                Open File
              </Button>
            </Box>
          ))}
        </DialogContent>
      </Dialog>

      {/* SNACKBAR ALERT */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}