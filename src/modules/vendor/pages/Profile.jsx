import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import VendorLayout from "../components/VendorLayout";


const Profile = () => {
  return (
    <VendorLayout>
      <Box
        sx={{
          width: "100%",
          px: { xs: 1.5, sm: 2, md: 3 },
          py: 2,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 3,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                fontSize: {
                    xs: "1.8rem",
                    md: "2.2rem",
                },
                }}
            >
                Vendor Profile
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 1.5,
                  opacity: 0.9,
                  maxWidth: 700,
                  lineHeight: 1.7,
                }}
              >
                Manage vendor account information,
                business details, and contact settings.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Main Section */}
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            m: 0,
          }}
        >

          {/* Right Details Card */}
          <Grid item xs={12} lg={8}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                height: "100%",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                  >
                    Personal Information
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.8 }}
                  >
                    Update your account and business
                    details.
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      defaultValue="Abhilash Vendors"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Owner Name"
                      defaultValue="Abhilash H"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      defaultValue="vendor@example.com"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      defaultValue="+91 9876543210"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Business Address"
                      defaultValue="Electronic City, Bengaluru, Karnataka"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="GST Number"
                      defaultValue="29ABCDE1234F1Z5"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      defaultValue="560100"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Business Description"
                      defaultValue="Reliable vendor offering quality products/services, timely delivery, and excellent customer support."
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ mt: 5 }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 700,
                      boxShadow: "none",
                    }}
                  >
                    Save Changes
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </VendorLayout>
  );
};

export default Profile;