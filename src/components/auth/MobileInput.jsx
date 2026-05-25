import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const MobileInput = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const adminNumber = '1234567890';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: must be exactly 10 digits and only numbers
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError(''); 

    if (mobile === adminNumber) {
      login({ role: 'admin', mobile });
      navigate('/admin/dashboard');
    } else {
      localStorage.setItem('mobile', mobile);
      navigate('/verify-otp');
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