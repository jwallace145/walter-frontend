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
import SearchBar from './SearchBar';
import DrawerButton from './DrawerButton';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import WalterLogo from '../logo/walter-logo.png';

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
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getDrawerButtons = () => {
    if (props.authenticated) {
      return (
        <>
          <DrawerButton
            onClick={() => navigate(DASHBOARD_PAGE)}
            buttonName={'Portfolio'}
          />
          <DrawerButton
            onClick={() => navigate(NEWSLETTER_PAGE)}
            buttonName={'Newsletter'}
          />
          <DrawerButton onClick={handleLogoutButton} buttonName={'Exit'} />
        </>
      );
    } else {
      return (
        <>
          <DrawerButton
            onClick={() => navigate(LOGIN_PAGE)}
            buttonName={'login'}
          />
          <DrawerButton
            onClick={() => navigate(REGISTER_PAGE)}
            buttonName={'Register'}
          />
        </>
      );
    }
  };

  /**
   * Get the buttons for the AppBar
   *
   * If the user is authenticated, get the restricted header buttons for
   * sending a newsletter, seeing the portfolio dashboard, etc. If the user is
   * not authenticated, return the login and register header buttons.
   */
  const getHeaderButtons = () => {
    if (props.authenticated) {
      return (
        <Box display="flex" gap={1} sx={{ marginLeft: 'auto' }}>
          <HeaderButton
            title={'Dashboard'}
            onClick={() => navigate(DASHBOARD_PAGE)}
            children={<ShowChartIcon />}
          />
          <HeaderButton
            title={'Newsletter'}
            onClick={() => navigate(NEWSLETTER_PAGE)}
            children={<SendIcon />}
          />
          <HeaderButton
            title={'Logout'}
            onClick={handleLogoutButton}
            children={<LogoutIcon />}
          />
        </Box>
      );
    } else {
      return (
        <Box display="flex" gap={1}>
          <HeaderButton
            title={'login'}
            onClick={() => navigate(LOGIN_PAGE)}
            children={<LoginIcon />}
          />
          <HeaderButton
            title={'Sign Up'}
            onClick={() => navigate(REGISTER_PAGE)}
            children={<AddCircleOutlineIcon />}
          />
        </Box>
      );
    }
  };

  /**
   * Handle logout button and unset user token and redirect to login page.
   */
  const handleLogoutButton = () => {
    removeCookie(WALTER_TOKEN_NAME);
    setOpen(false);
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              marginLeft: 'auto',
            }}
          >
            {getHeaderButtons()}
          </Box>
          {props.authenticated && <SearchBar />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
