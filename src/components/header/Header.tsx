import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
} from '../../pages/common/Pages';
import SendIcon from '@mui/icons-material/Send';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HeaderButton from './HeaderButton';
import DrawerButton from './DrawerButton';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import WalterLogo from '../logo/walter-logo.png';
import Typography from '@mui/material/Typography';

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
 * the authentication status of the user. The header is responsive and adapts
 * its structure according to the screen width of the client device. This
 * ensures that mobile users with small screen sizes are still able to use
 * the header and navigate throughout Walter.
 *
 * @param props
 * @constructor
 */
const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();

  const getHeaderButtons = () => {
    if (!props.authenticated) {
      return (
        <>
          <HeaderButton title="Home" onClick={() => navigate(LANDING_PAGE)} />
          <HeaderButton
            title="Sign Up"
            onClick={() => navigate(REGISTER_PAGE)}
          />
          <HeaderButton title="Login" onClick={() => navigate(LOGIN_PAGE)} />
        </>
      );
    } else {
      return (
        <>
          <HeaderButton
            title={'Dashboard'}
            onClick={() => navigate(DASHBOARD_PAGE)}
          />
          <HeaderButton
            title={'Newsletter'}
            onClick={() => navigate(NEWSLETTER_PAGE)}
          />
          <HeaderButton title={'Logout'} onClick={handleLogoutButton} />
        </>
      );
    }
  };

  const handleLogoutButton = () => {
    removeCookie(WALTER_TOKEN_NAME);
    navigate(LOGIN_PAGE);
    props.setAuthenticated(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #B5E0F7, white)',
        height: '120px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              alignItems: 'left',
              marginTop: '10px',
            }}
          >
            <img
              src={WalterLogo}
              alt="Walter Logo"
              style={{
                width: 'auto',
                height: '100px',
                marginRight: 24,
                marginBottom: '10px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(LANDING_PAGE)}
            />
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}
          >
            {getHeaderButtons()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
