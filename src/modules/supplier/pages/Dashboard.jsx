import SupplierLayout from "../components/SupplierLayout";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const stats = [
  {
    title: "Total Products",
    value: "120",
    icon: <Inventory2OutlinedIcon />,
    color: "#1976d2",
    progress: 75,
  },
  {
    title: "Overall Stock",
    value: "1,540",
    icon: <WarehouseOutlinedIcon />,
    color: "#2e7d32",
    progress: 60,
  },
  {
    title: "Pending Requests",
    value: "18",
    icon: <PendingActionsOutlinedIcon />,
    color: "#ed6c02",
    progress: 45,
  },
  {
    title: "Monthly Growth",
    value: "+24%",
    icon: <TrendingUpOutlinedIcon />,
    color: "#9c27b0",
    progress: 82,
  },
];

const activities = [
  {
    title: "New order received from Vendor A",
    time: "10 mins ago",
    icon: <LocalShippingOutlinedIcon color="primary" />,
    status: "New",
  },
  {
    title: "Stock updated for Paracetamol",
    time: "45 mins ago",
    icon: <CheckCircleOutlineOutlinedIcon color="success" />,
    status: "Updated",
  },
  {
    title: "Low stock alert for Surgical Gloves",
    time: "2 hours ago",
    icon: <WarningAmberOutlinedIcon color="warning" />,
    status: "Alert",
  },
  {
    title: "Vendor B request approved",
    time: "Today, 09:30 AM",
    icon: <CheckCircleOutlineOutlinedIcon color="success" />,
    status: "Approved",
  },
];

const inventory = [
  {
    name: "Medicines",
    value: 80,
  },
  {
    name: "Equipment",
    value: 65,
  },
  {
    name: "Surgical Supplies",
    value: 45,
  },
  {
    name: "Safety Products",
    value: 72,
  },
];

const Dashboard = () => {
  return (
    <SupplierLayout>
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
            p: { xs: 2.5, md: 3 },
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
            spacing={2}
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
                Overview
            </Typography>

            <Typography
                variant="body1"
                sx={{
                mt: 1,
                opacity: 0.9,
                maxWidth: 650,
                lineHeight: 1.6,
                fontSize: "0.98rem",
                }}
            >
                Monitor inventory, vendor requests,
                deliveries, and supply chain performance
                from one place.
            </Typography>
            </Box>

            <Button
            variant="contained"
            endIcon={<ArrowForwardOutlinedIcon />}
            sx={{
                bgcolor: "#fff",
                color: "#1976d2",
                borderRadius: 3,
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                minWidth: 180,
                boxShadow: "none",
                "&:hover": {
                bgcolor: "#f5f5f5",
                },
            }}
            >
            Generate Report
            </Button>
        </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            m: 0,
          }}
        >
          {stats.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={index}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "0.3s",
                  bgcolor: "#fff",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={500}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="h3"
                        fontWeight="700"
                        sx={{ mt: 1 }}
                      >
                        {item.value}
                      </Typography>
                    </Box>

                    <Avatar
                      sx={{
                        bgcolor: item.color,
                        width: 62,
                        height: 62,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </Stack>

                  <Box sx={{ mt: 4 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 8,
                        borderRadius: 10,
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        mt: 1.2,
                        display: "block",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.progress}% performance
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Section */}
        <Grid
          container
          spacing={3}
          sx={{
            mt: 1,
            width: "100%",
            m: 0,
          }}
        >
          {/* Recent Activities */}
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
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="700"
                    >
                      Recent Activities
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Latest inventory and vendor
                      updates
                    </Typography>
                  </Box>

                  <Chip
                    label="Live Updates"
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: "bold",
                    }}
                  />
                </Stack>

                <List disablePadding>
                  {activities.map((activity, index) => (
                    <Box key={index}>
                      <ListItem
                        disableGutters
                        sx={{
                          py: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns:
                              "56px minmax(0,1fr) auto",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <ListItemAvatar
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "#f5f7fa",
                                width: 50,
                                height: 50,
                              }}
                            >
                              {activity.icon}
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            primary={
                              <Typography
                                fontWeight="600"
                                sx={{
                                  fontSize: "1rem",
                                }}
                              >
                                {activity.title}
                              </Typography>
                            }
                            secondary={activity.time}
                          />

                          <Chip
                            label={activity.status}
                            color={
                              activity.status ===
                              "Alert"
                                ? "warning"
                                : activity.status ===
                                  "Approved"
                                ? "success"
                                : "primary"
                            }
                            size="small"
                            sx={{
                              minWidth: 90,
                              fontWeight: "bold",
                            }}
                          />
                        </Box>
                      </ListItem>

                      {index !==
                        activities.length - 1 && (
                        <Divider />
                      )}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Inventory Overview */}
          <Grid item xs={12} lg={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                height: "100%",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  fontWeight="700"
                  mb={4}
                >
                  Inventory Overview
                </Typography>

                <Stack spacing={3}>
                  {inventory.map((item, index) => (
                    <Box key={index}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="600"
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          fontWeight="700"
                        >
                          {item.value}%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          height: 10,
                          borderRadius: 10,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </SupplierLayout>
  );
};

export default Dashboard;