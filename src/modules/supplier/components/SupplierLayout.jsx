import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SupplierLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        alignItems: "stretch", // makes sidebar and content same height
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar/>
        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 2 },
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SupplierLayout;