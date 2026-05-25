import DashboardLayout from '../components/layout/DashboardLayout';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Heading */}
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Welcome Admin! Here’s an overview of your platform activities.
        </Typography>

        {/* Dashboard Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Total Users */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4">512</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Vendors */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Vendors
                </Typography>
                <Typography variant="h4">34</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Suppliers */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Suppliers
                </Typography>
                <Typography variant="h4">27</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Approvals */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f3e5f5' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Approvals
                </Typography>
                <Typography variant="h4">5</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activities Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activities
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((activity) => (
              <Grid item xs={12} sm={4} key={activity}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">
                      Activity #{100 + activity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: User registration
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: Completed
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

export default AdminDashboard;