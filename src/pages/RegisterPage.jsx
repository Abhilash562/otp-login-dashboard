import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const RegisterPage = () => {
   const [form, setForm] = useState({
    name: '',
    mobile: '',
    location: '',
    businessName: '',
    businessType: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API call
      await axios.post('/api/register', form);
      alert('Registration successful');
      navigate('/login');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Error registering');
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
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          width: { xs: '100%', sm: 450 },
          borderRadius: 3,
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary' }}
        >
          Register
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          color="textSecondary"
          sx={{ mb: 4 }}
        >
          Fill in your details to create an account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Business Name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Business Type</InputLabel>
            <Select
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
            >
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)',
              },
            }}
          >
            Register
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 3 }}
          >
            Already have an account?{' '}
            <span
              style={{ color: '#007FFF', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;