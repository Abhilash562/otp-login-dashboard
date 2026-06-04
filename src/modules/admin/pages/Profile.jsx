import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";

const adminData = {
  name: "Abhilash",
  email: "admin@example.com",
  role: "Admin",
  phone: "+91 9876543210",
  joined: "2023-01-15",
  avatar: "https://via.placeholder.com/100",
};

const Profile = () => {
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
          Admin Profile
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Only one admin account is allowed.
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Avatar */}
            <Grid item xs={12} sm={3} md={2}>
              <Avatar
                src={adminData.avatar}
                alt={adminData.name}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>

            {/* Info */}
            <Grid item xs={12} sm={9} md={10}>
              <Typography variant="h6" fontWeight={600}>
                {adminData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {adminData.role}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{adminData.email}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{adminData.phone}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Joined
                  </Typography>
                  <Typography variant="body1">{adminData.joined}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;