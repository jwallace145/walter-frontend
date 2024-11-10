import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { removeCookie } from 'typescript-cookie';
import {
  DASHBOARD_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  NEWSLETTER_PAGE,
  REGISTER_PAGE,
  WALTER_TOKEN_NAME,
} from '../../constants/Constants';
import SendIcon from '@mui/icons-material/Send';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HeaderButton from './HeaderButton';
import SearchBar from './SearchBar';

/**
 * HeaderProps
 *
 * The props to pass to the Walter AppBar header. Users use the header
 * to navigate throughout Walter so the authentication status of the user
 * determines which header buttons are available.
 */
export interface HeaderProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

/**
 * Header
 *
 * The AppBar header for Walter. The AppBar helps users navigate throughout
 * the site. The header buttons available for navigation are determined by
 * the authentication status of the user.
 *
 * @param props
 * @constructor
 */
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();

  /**
   * Get the buttons for the AppBar
   *
   * If the user is authenticated, get the restricted header buttons for
   * sending a newsletter, seeing the portfolio dashboard, etc. If the user is
   * not authenticated, return the login and register header buttons.
   */
  const getButtons = () => {
    if (props.authenticated) {
      return (
        <>
          <HeaderButton
            onClick={() => navigate(DASHBOARD_PAGE)}
            children={<ShowChartIcon />}
          />
          <HeaderButton
            onClick={() => navigate(NEWSLETTER_PAGE)}
            children={<SendIcon />}
          />
          <HeaderButton
            onClick={() => navigate(DASHBOARD_PAGE)}
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
          <HeaderButton
            onClick={() => navigate(LOGIN_PAGE)}
            children={<LoginIcon />}
          />
          <HeaderButton
            onClick={() => navigate(REGISTER_PAGE)}
            children={<AddCircleOutlineIcon />}
          />
        </>
      );
    }
  };

  /**
   * Handle logout button and unset user token and redirect to login page.
   */
  const handleLogoutButton = () => {
    removeCookie(WALTER_TOKEN_NAME);
    navigate(LOGIN_PAGE);
    props.setAuthenticated(false);
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
            onClick={() => navigate(LANDING_PAGE)}
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
