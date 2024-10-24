import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate('/login');
  };

  const handleSignUpButton = () => {
    navigate('/signup');
  };

  const handleAddStockButtion = () => {
    navigate('/addstock');
  };

  const handleGetStocksForUserButtion = () => {
    navigate('/getstocksforuser');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Walter
        </Typography>
        <Button color="inherit" onClick={handleLoginButton}>
          Login
        </Button>
        <Button color="inherit" onClick={handleSignUpButton}>
          Sign Up
        </Button>
        <Button color="inherit" onClick={handleAddStockButtion}>
          Add Stock
        </Button>
        <Button color="inherit" onClick={handleGetStocksForUserButtion}>
          Get Stocks
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
