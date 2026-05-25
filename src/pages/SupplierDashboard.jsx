import DashboardLayout from '../components/Layout/DashboardLayout.jsx';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const SupplierDashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Heading */}
        <Typography variant="h4" gutterBottom>
          Supplier Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Welcome to your supplier portal. Here’s a summary of your activities.
        </Typography>

        {/* Dashboard Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Total Orders */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Orders
                </Typography>
                <Typography variant="h4">128</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Shipments */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Shipments
                </Typography>
                <Typography variant="h4">24</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Products */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Products
                </Typography>
                <Typography variant="h4">56</Typography>
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
                <Typography variant="h4">12</Typography>
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
                      Order #{1000 + order}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Customer: John Doe
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: Pending
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

export default SupplierDashboard;