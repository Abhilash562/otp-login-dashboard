import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../context/AuthContext.jsx';

const MobileInput = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate 10-digit number
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:8080/sendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: mobile }),
      });

      const data = await response.json();

      const role = localStorage.setItem('role', data.role);
      
      localStorage.setItem('mobile', mobile);

      if (response.status === 200) {
        login({ role, mobile });
        // success case
          navigate('/verify-otp');
      } 
      else if (response.status !== 200) {
        setError(data.message || 'Mobile number not registered');
      } 
      else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enter Your Mobile Number
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          We'll send you an OTP to verify your number
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            inputProps={{ maxLength: 10 }}
            error={!!error} 
            helperText={error} 
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default MobileInput;