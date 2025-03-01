import React from 'react';
import { Container, ListItem, Modal } from '@mui/material';
import { Colors, Fonts, WALTER_TOKEN_NAME } from '../../constants/Constants';
import HeaderButton from '../header/HeaderButton';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  DASHBOARD_PAGE,
  LANDING_PAGE,
  NEWSLETTER_PAGE,
  PORTFOLIO_PAGE,
  SETTINGS_PAGE,
} from '../../pages/common/Pages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import { removeCookie } from 'typescript-cookie';

interface SideBarProps {
  setAuthenticated: (authenticated: boolean) => void;
}

// does not include logout button because logout button does not navigate
// anywhere, just opens a logout model for the user to logout
const SIDEBAR_NAVIGATE_BUTTONS: any[] = [
  { title: 'Dashboard', page: DASHBOARD_PAGE },
  { title: 'Portfolio', page: PORTFOLIO_PAGE },
  { title: 'Newsletter', page: NEWSLETTER_PAGE },
  { title: 'Settings', page: SETTINGS_PAGE },
];

const SideBar: React.FC<SideBarProps> = (
  props: SideBarProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

  const getButtons: () => React.ReactElement[] = (): React.ReactElement[] => {
    return [
      ...SIDEBAR_NAVIGATE_BUTTONS.map((button: any) => (
        <HeaderButton
          title={button.title}
          onClick={() => navigate(button.page)}
        />
      )),
      getLogoutButton(),
    ];
  };

  const getLogoutButton: () => React.ReactElement = (): React.ReactElement => {
    return (
      <HeaderButton
        title={'Logout'}
        onClick={(): void => setOpenLogoutModal(true)}
      />
    );
  };

  const handleLogout: () => void = (): void => {
    setOpenLogoutModal(false);
    removeCookie(WALTER_TOKEN_NAME);
    navigate(LANDING_PAGE);
    props.setAuthenticated(false);
  };

  return (
    <>
      <Container
        sx={{
          padding: 2,
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: `2px solid ${Colors.GRAY}`,
        }}
      >
        {getButtons()}
      </Container>
      <Modal open={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: Colors.LIGHT_GRAY,
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: Fonts.RALEWAY, fontWeight: '700' }}
            >
              Logout?
            </Typography>
            <LoadingButton
              loading={false}
              onClick={handleLogout}
              text={'Logout'}
              sx={{
                marginTop: '10px',
                backgroundColor: Colors.YELLOW,
                borderRadius: '40px',
                padding: '2px',
                '&:hover': {
                  backgroundColor: Colors.YELLOW_HOVER,
                },
                transition: 'background-color 0.3s ease',
                width: '50%',
              }}
            />
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default SideBar;
