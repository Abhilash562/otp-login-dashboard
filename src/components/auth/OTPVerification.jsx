import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext.jsx';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const mobile = localStorage.getItem('mobile');

  const handleVerify = async (e) => {
    e.preventDefault();

    const role = localStorage.getItem('role');
    const supplierId = localStorage.getItem("uniqueUserId");

    try {
      const response = await fetch('http://localhost:8080/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: mobile,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (data.status === "VERIFIED") {
        localStorage.setItem("token" , data.token);
        login({ role, mobile, supplierId });
        
        // NEW: check verification before routing
      if (role === "SUPPLIER") {
        navigate("/supplier/verification-check");
      } else {
        navigate(`/${role}/dashboard`);
      }
      } else {
        alert(data.message || 'Invalid OTP');
      }

    } catch (error) {
      console.error(error);
      alert('Something went wrong during OTP verification');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: { xs: '100%', sm: 400 },
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary' }}>
          OTP Verification
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 4 }}>
          Enter the OTP sent to <strong>{mobile}</strong>
        </Typography>

        <form onSubmit={handleVerify}>
          <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 4, style: { textAlign: 'center', letterSpacing: '0.3em' } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Verify OTP
          </Button>
        </form>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 3 }}
        >
          Didn't receive OTP?{' '}
          <span
            style={{ color: '#ff003c', cursor: 'pointer' }}
            onClick={() => alert('Resend OTP feature coming soon!')}
          >
            Resend
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default OTPVerification;