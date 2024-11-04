import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { removeCookie } from 'typescript-cookie';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import SendIcon from '@mui/icons-material/Send';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HeaderButton from './HeaderButton';
import SearchBar from './SearchBar';

export interface HeaderProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();

  const handleLandingPageButton = () => {
    navigate('/');
  };

  const handleLoginButton = () => {
    navigate('/login');
  };

  const handleSignUpButton = () => {
    navigate('/signup');
  };

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  const handleSendNewsletterButton = () => {
    navigate('/newsletter');
  };

  const handleLogoutButton = () => {
    removeCookie(WALTER_TOKEN_NAME);
    navigate('/login');
    props.setAuthenticated(false);
  };

  const getButtons = () => {
    if (props.authenticated) {
      return (
        <>
          <HeaderButton
            onClick={handleDashboardButton}
            children={<ShowChartIcon />}
          />
          <HeaderButton
            onClick={handleSendNewsletterButton}
            children={<SendIcon />}
          />
          <HeaderButton
            onClick={handleDashboardButton}
            children={<EmailIcon />}
          />
          <HeaderButton
            onClick={handleLogoutButton}
            children={<LogoutIcon />}
          />
        </>
      );
    } else {
      return (
        <>
          <HeaderButton onClick={handleLoginButton} children={<LoginIcon />} />
          <HeaderButton
            onClick={handleSignUpButton}
            children={<AddCircleOutlineIcon />}
          />
        </>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={handleLandingPageButton}
          >
            WALTER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {getButtons()}
          </Box>
          {props.authenticated && <SearchBar />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
