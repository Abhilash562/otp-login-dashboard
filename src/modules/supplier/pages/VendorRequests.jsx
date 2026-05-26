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
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const stats = [
  {
    title: "Total Requests",
    value: "128",
    icon: <StorefrontOutlinedIcon />,
    color: "#1976d2",
  },
  {
    title: "Pending",
    value: "18",
    icon: <PendingActionsOutlinedIcon />,
    color: "#ed6c02",
  },
  {
    title: "Approved",
    value: "96",
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: "#2e7d32",
  },
  {
    title: "Rejected",
    value: "14",
    icon: <CancelOutlinedIcon />,
    color: "#d32f2f",
  },
];

const requests = [
  {
    id: 1,
    vendor: "MediCare Suppliers",
    product: "Paracetamol 500mg",
    quantity: "200 Units",
    date: "25 May 2026",
    status: "Pending",
  },
  {
    id: 2,
    vendor: "HealthPlus Distributors",
    product: "Surgical Gloves",
    quantity: "500 Boxes",
    date: "24 May 2026",
    status: "Approved",
  },
  {
    id: 3,
    vendor: "CareLine Pharma",
    product: "BP Monitor",
    quantity: "50 Units",
    date: "23 May 2026",
    status: "Rejected",
  },
  {
    id: 4,
    vendor: "LifeCare Medicals",
    product: "Face Masks",
    quantity: "1000 Pieces",
    date: "22 May 2026",
    status: "Approved",
  },
];

const VendorRequests = () => {
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
            Vendor Requests
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage vendor purchase requests and approvals efficiently.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Create Request
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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

      {/* Requests List */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Recent Vendor Requests
          </Typography>

          <Stack spacing={2}>
            {requests.map((request) => (
                <Card
                key={request.id}
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 4,
                    "&:hover": {
                    boxShadow: 3,
                    backgroundColor: "#fafafa",
                    },
                }}
                >
                <CardContent>
                    {/* Row Layout */}
                    <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                        xs: "1fr",
                        md: "3fr 1fr 1fr 1fr 1fr",
                        },
                        alignItems: "center",
                        gap: 3,
                    }}
                    >
                    {/* Vendor */}
                    <Box
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                        }}
                    >
                        <Avatar
                        sx={{
                            bgcolor: "#1976d2",
                            width: 52,
                            height: 52,
                        }}
                        >
                        <StorefrontOutlinedIcon />
                        </Avatar>

                        <Box>
                        <Typography fontWeight="bold">
                            {request.vendor}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {request.product}
                        </Typography>
                        </Box>
                    </Box>

                    {/* Quantity */}
                    <Box textAlign="center">
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        >
                        Quantity
                        </Typography>

                        <Typography fontWeight="600">
                        {request.quantity}
                        </Typography>
                    </Box>

                    {/* Date */}
                    <Box textAlign="center">
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        >
                        Date
                        </Typography>

                        <Typography fontWeight="600">
                        {request.date}
                        </Typography>
                    </Box>

                    {/* Status */}
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <Chip
                        label={request.status}
                        color={
                            request.status === "Pending"
                            ? "warning"
                            : request.status === "Approved"
                            ? "success"
                            : "error"
                        }
                        sx={{
                            minWidth: 110,
                            fontWeight: "bold",
                            borderRadius: 2,
                        }}
                        />
                    </Box>

                    {/* Action */}
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <Button
                        variant="outlined"
                        startIcon={<VisibilityOutlinedIcon />}
                        sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            minWidth: 120,
                            fontWeight: 600,
                        }}
                        >
                        View
                        </Button>
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            ))}
            </Stack>
        </CardContent>
      </Card>
    </SupplierLayout>
  );
};

export default VendorRequests;