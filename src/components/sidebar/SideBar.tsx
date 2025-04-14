import React from 'react';
import { Container, Modal } from '@mui/material';
import { Colors, Fonts, WALTER_TOKEN_NAME } from '../../constants/Constants';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  DASHBOARD_PAGE,
  EXPENSES_PAGE,
  LANDING_PAGE,
  NEWSLETTER_PAGE,
  PORTFOLIO_PAGE,
  SETTINGS_PAGE,
} from '../../pages/common/Pages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import { removeCookie } from 'typescript-cookie';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddchartIcon from '@mui/icons-material/Addchart';
import EmailIcon from '@mui/icons-material/Email';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SideBarButton from './SideBarButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface SideBarProps {
  setAuthenticated: (authenticated: boolean) => void;
  currentTab: string;
}

const SideBar: React.FC<SideBarProps> = (
  props: SideBarProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

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
        }}
      >
        <SideBarButton
          title="Dashboard"
          icon={<AutoGraphIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): void => navigate(DASHBOARD_PAGE)}
          bold={props.currentTab.toLowerCase() === 'dashboard'}
          sx={{ marginTop: '30px' }}
        />
        <SideBarButton
          title="Portfolio"
          icon={<AddchartIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): void => navigate(PORTFOLIO_PAGE)}
          bold={props.currentTab.toLowerCase() === 'portfolio'}
          sx={{ marginTop: '30px' }}
        />
        <SideBarButton
          title="Expenses"
          icon={<PaymentIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): void => navigate(EXPENSES_PAGE)}
          bold={props.currentTab.toLowerCase() === 'expenses'}
          sx={{ marginTop: '30px' }}
        />
        <SideBarButton
          title="Newsletters"
          icon={<MailOutlineIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): void => navigate(NEWSLETTER_PAGE)}
          bold={props.currentTab.toLowerCase() === 'newsletters'}
          sx={{ marginTop: '30px' }}
        />
        <SideBarButton
          title="Settings"
          icon={<SettingsIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): void => navigate(SETTINGS_PAGE)}
          bold={props.currentTab.toLowerCase() === 'settings'}
          sx={{ marginTop: '30px' }}
        />
        <SideBarButton
          title="Logout"
          icon={<LogoutIcon sx={{ color: Colors.YELLOW }} />}
          onClick={(): any => setOpenLogoutModal(true)}
          bold={props.currentTab.toLowerCase() === 'logout'}
          sx={{ marginTop: '30px', marginBottom: '30px' }}
        />
      </Container>
      <Modal
        open={openLogoutModal}
        onClose={(): void => setOpenLogoutModal(false)}
      >
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
              padding: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: Fonts.RALEWAY, fontWeight: 'bold' }}
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
