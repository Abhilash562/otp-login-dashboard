import DashboardLayout from '../components/Layout/DashboardLayout.jsx';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

const VendorDashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Heading */}
        <Typography variant="h4" gutterBottom>
          Vendor Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Welcome back! Here’s an overview of your vendor activities.
        </Typography>

        {/* Dashboard Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Products Listed */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Orders
                </Typography>
                <Typography variant="h4">75</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Received */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Shipments
                </Typography>
                <Typography variant="h4">45</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Shipments Pending */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Products
                </Typography>
                <Typography variant="h4">12</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Messages */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f3e5f5' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Messages
                </Typography>
                <Typography variant="h4">8</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Orders Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((order) => (
              <Grid item xs={12} sm={4} key={order}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">
                      Order #{2000 + order}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Customer: Jane Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: Shipped
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default VendorDashboard;