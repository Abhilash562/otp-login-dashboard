import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Container,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import VendorLayout from "../components/VendorLayout";
import React from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,284",
      icon: <Inventory2OutlinedIcon />,
      color: "#1976d2",
      updated: "2h ago",
    },
    {
      title: "My Orders",
      value: "42",
      icon: <ShoppingCartOutlinedIcon />,
      color: "#2e7d32",
      updated: "30m ago",
    },
    {
      title: "Pending Requests",
      value: "8",
      icon: <PendingActionsOutlinedIcon />,
      color: "#ed6c02",
      updated: "1h ago",
    },
    {
      title: "Activity Logs",
      value: "24",
      icon: <TimelineOutlinedIcon />,
      color: "#9c27b0",
      updated: "5m ago",
    },
  ];

  const recentActivities = [
    { time: "10:45 AM", activity: "Order #1024 has been shipped" },
    { time: "9:30 AM", activity: "New product 'Wireless Mouse' added" },
    { time: "Yesterday", activity: "Order #1019 approved" },
    { time: "2 days ago", activity: "Inventory updated for USB-C Cables" },
  ];

  return (
    <VendorLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>

        {/* HEADER */}
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
          Dashboard Overview
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Monitor your store performance, manage orders, track inventory,
              and review recent system activity from a single place.
        </Typography>
      </Box>

        {/* STATS */}
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item.title}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #eef0f4",
                  p: 1,
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>

                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{ mt: 0.5 }}
                      >
                        {item.value}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Updated {item.updated}
                      </Typography>
                    </Box>

                    <Avatar
                      sx={{
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        width: 48,
                        height: 48,
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

        {/* RECENT ACTIVITY */}
        <Box sx={{ mt: 5 }}>
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Latest updates from your store operations
            </Typography>
          </Stack>

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #eef0f4",
            }}
          >
            <List sx={{ py: 0 }}>
              {recentActivities.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={500}>
                          {item.activity}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {item.time}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {index < recentActivities.length - 1 && (
                    <Divider component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Box>
      </Container>
    </VendorLayout>
  );
};

export default Dashboard;