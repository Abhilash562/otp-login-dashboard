import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Professional App
        </Typography>

        {/* Dummy Navigation Buttons */}
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;