import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { removeCookie } from 'typescript-cookie';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import { grey } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

  const handleAddStockButton = () => {
    navigate('/addstock');
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
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleDashboardButton}
          >
            <ShowChartIcon />
          </Avatar>
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleSendNewsletterButton}
          >
            <SendIcon />
          </Avatar>
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleDashboardButton}
          >
            <EmailIcon />
          </Avatar>
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleLogoutButton}
          >
            <LogoutIcon />
          </Avatar>
        </>
      );
    } else {
      return (
        <>
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleLoginButton}
          >
            <LoginIcon />
          </Avatar>
          <Avatar
            sx={{
              bgcolor: grey[600],
              cursor: 'pointer',
              '&:hover': {
                bgcolor: grey[400], // Change to your desired hover color
              },
            }}
            onClick={handleSignUpButton}
          >
            <AddCircleOutlineIcon />
          </Avatar>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
