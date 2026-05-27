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
    mobileNumber: '',
    location: '',
    businessName: '',
    businessType: '',
    role:'',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //frontend validation
    if(form.mobileNumber.length!==10){
      alert('Mobile number must be exactly 10 digits');
      return;
    }

    try{
      const response = await axios.post(
        'http://localhost:8080/register',
        {
          name: form.name,
          mobileNumber: form.mobileNumber,
          location: form.location,
          businessName: form.businessName,
          businessType: form.businessType,
          role: form.role,
        },
        {
          headers:{
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      alert('Registration successful');
      navigate('/login');
    } catch(err){
      console.error(err);

      alert(
        err.response?.data?.message || 'Error registering user'
      );
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
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) {
                setForm({ ...form, mobileNumber: value });
              }
            }}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 10 }}
            error={form.mobileNumber.length > 0 && form.mobileNumber.length !== 10}
            helperText={
              form.mobileNumber.length > 0 && form.mobileNumber.length !== 10
                ? 'Mobile number must be exactly 10 digits'
                : ''
            }
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

          <TextField
          label="Business Type"
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="SUPPLIER">SUPPLIER</MenuItem>
              <MenuItem value="VENDOR">VENDOR</MenuItem>
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