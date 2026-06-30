import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
  useTheme,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useMemo, useState } from "react";
import getSupplierVerificationStatus from "../verification/supplierVerificationService";
import { useNavigate } from "react-router-dom";

const SupplierStatusCard = () => {
  const theme = useTheme();

  const supplierId = localStorage.getItem("uniqueUserId");
  const token = localStorage.getItem("token");

  const [status, setStatus] = useState("LOADING");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getSupplierVerificationStatus(supplierId, token);
        setStatus(res?.data?.status || "UNKNOWN");
      } catch (err) {
        console.error(err);
        setStatus("UNKNOWN");
      }
    };

    if (supplierId && token) fetchStatus();
  }, [supplierId, token]);

  const statusConfig = useMemo(
    () => ({
      UNDER_REVIEW: {
        label: "Under Review",
        color: "warning",
        bg: theme.palette.warning.light,
      },
      APPROVED: {
        label: "Approved",
        color: "success",
        bg: theme.palette.success.light,
      },
      REJECTED: {
        label: "Rejected",
        color: "error",
        bg: theme.palette.error.light,
      },
      RESUBMISSION_REQUESTED: {
        label: "Resubmission Requested",
        color: "info",
        bg: theme.palette.info.light,
      },
      LOADING: {
        label: "Loading...",
        color: "default",
        bg: theme.palette.grey[200],
      },
      UNKNOWN: {
        label: "Unknown",
        color: "default",
        bg: theme.palette.grey[200],
      },
    }),
    [theme]
  );

  const config = statusConfig[status] || statusConfig.UNKNOWN;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        p: 2,
      }}
    >
      {/* 🌟 CENTER CARD */}
      <Card
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 4,
          overflow: "hidden",
          transition: "0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 10,
          },
        }}
      >
        {/* Top Accent */}
        <Box sx={{ height: 6, bgcolor: `${config.color}.main` }} />

        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>

            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Box
                sx={{
                  bgcolor: config.bg,
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                }}
              >
                <InfoOutlinedIcon fontSize="small" color={config.color} />
              </Box>

              <Typography variant="h6" fontWeight={700}>
                Supplier Verification
              </Typography>
            </Stack>

            <Divider />

            {/* Body */}
            <Typography variant="body2" color="text.secondary">
              Your current verification status is shown below. This determines your platform access level.
            </Typography>

            {/* Status Badge */}
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            >
            {/* Status Badge */}
            <Chip
                label={config.label}
                color={config.color}
                sx={{
                fontWeight: 700,
                px: 2,
                py: 1.5,
                borderRadius: 3,
                fontSize: "0.8rem",
                letterSpacing: 0.5,
                mr: 12,
                }}
            />

            {/* Action Button (only for resubmission) */}
            {status === "RESUBMISSION_REQUESTED" && (
                <Button
                variant="contained"
                color="warning"   
                onClick={() => navigate("/supplier/verification")}
                sx={{
                    fontWeight: 700,
                    borderRadius: 2,
                    textTransform: "none",
                }}
                >
                Resubmit
                </Button>
            )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupplierStatusCard;