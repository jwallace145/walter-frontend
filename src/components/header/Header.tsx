import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  Button,
  Container,
  List,
  ListItem,
  SwipeableDrawer,
} from '@mui/material';
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
import HeaderButton from './HeaderButton';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import WalterLogoText from '../logo/walter-logo-text.png';
import WalterLogo from '../logo/walter-logo.png';
import MenuIcon from '@mui/icons-material/Menu';
// @ts-ignore
import useIsMobile from '../utils/IsMobile';

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

const AUTHENTICATED_HEADER_BUTTON_PROPS: any[] = [
  { title: 'Dashboard', page: DASHBOARD_PAGE },
  { title: 'Newsletter', page: NEWSLETTER_PAGE },
];

const UNAUTHENTICATED_HEADER_BUTTON_PROPS: any[] = [
  { title: 'Home', page: LANDING_PAGE },
  { title: 'Sign Up', page: REGISTER_PAGE },
  { title: 'Login', page: LOGIN_PAGE },
];

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
  const isMobile: boolean = useIsMobile();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const getLogo = (isMobile: boolean) => {
    if (isMobile) {
      return (
        <img
          src={WalterLogo}
          alt="Walter Logo"
          style={{
            width: 'auto',
            height: '40px',
            marginTop: 12,
            marginRight: 24,
            cursor: 'pointer',
          }}
          onClick={() => navigate(LANDING_PAGE)}
        />
      );
    } else {
      return (
        <img
          src={WalterLogoText}
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
      );
    }
  };

  const getHeaderMenu = (authenticated: boolean) => {
    return (
      <>
        <Button
          fullWidth
          onClick={() => setOpenMenu(true)}
          sx={{
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            color: 'black',
            visibility: 'visible',
          }}
        >
          <MenuIcon fontSize="large" />
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          onOpen={() => setOpenMenu(true)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
          >
            <List>{getHeaderMenuButtons(authenticated)}</List>
          </Box>
        </SwipeableDrawer>
      </>
    );
  };

  const getHeaderMenuButtons = (authenticated: boolean) => {
    if (authenticated) {
      return [
        ...AUTHENTICATED_HEADER_BUTTON_PROPS.map((button: any) =>
          getHeaderMenuButton(button),
        ),
        getHeaderMenuLogoutButton(),
      ];
    } else {
      return UNAUTHENTICATED_HEADER_BUTTON_PROPS.map((button: any) =>
        getHeaderMenuButton(button),
      );
    }
  };

  const getHeaderMenuButton = (button: any) => {
    return (
      <ListItem key={button.title} disablePadding>
        {getHeaderButton(button)}
      </ListItem>
    );
  };

  const getHeaderMenuLogoutButton = () => {
    return (
      <ListItem key={'Logout'} disablePadding>
        {getHeaderLogoutButton()}
      </ListItem>
    );
  };

  const getHeaderButtons = (authenticated: boolean) => {
    if (authenticated) {
      return [
        ...AUTHENTICATED_HEADER_BUTTON_PROPS.map((button: any) =>
          getHeaderButton(button),
        ),
        getHeaderLogoutButton(),
      ];
    } else {
      return UNAUTHENTICATED_HEADER_BUTTON_PROPS.map((button: any) =>
        getHeaderButton(button),
      );
    }
  };

  const getHeaderButton = (button: any) => {
    return (
      <HeaderButton
        title={button.title}
        onClick={() => navigate(button.page)}
      />
    );
  };

  const getHeaderLogoutButton = () => {
    return <HeaderButton title={'Logout'} onClick={handleLogoutButton} />;
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
        height: isMobile ? '80px' : '120px',
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
            {getLogo(isMobile)}
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}
          >
            {isMobile
              ? getHeaderMenu(props.authenticated)
              : getHeaderButtons(props.authenticated)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
