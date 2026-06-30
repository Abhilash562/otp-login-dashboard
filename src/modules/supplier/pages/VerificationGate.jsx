import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";

import { Box, CircularProgress, Typography } from "@mui/material";
import getSupplierVerificationStatus from "../verification/supplierVerificationService";

const VerificationGate = () => {
//   const { user } = useAuth();
  const navigate = useNavigate();

  const supplierId = localStorage.getItem("uniqueUserId");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getSupplierVerificationStatus(
          supplierId,
          token
        );

        const status = res.data.status;

        if (status === "APPROVED") {
          navigate("/supplier/dashboard");
        } else if (status === "PENDING") {
          navigate("/supplier/verification");
        } else{
          navigate("/supplier/verification-status")
        }
      } catch (err) {
        console.error(err);
        navigate("/supplier/verification-status");
      }
    };

    checkStatus();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>
        Checking supplier verification...
      </Typography>
    </Box>
  );
};

export default VerificationGate;