import React, { Dispatch } from 'react';
import { Container, Modal } from '@mui/material';
import { Colors, Fonts, WALTER_TOKEN_NAME } from '../../constants/Constants';
import HeaderButton from '../header/HeaderButton';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { DASHBOARD_PAGE, LANDING_PAGE } from '../../pages/common/Pages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import { removeCookie } from 'typescript-cookie';

interface DashboardSideBarProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const DashboardSideBar: React.FC<DashboardSideBarProps> = (
  props: DashboardSideBarProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

  const handleLogout = () => {
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
        <HeaderButton
          title="Dashboard"
          onClick={() => navigate(DASHBOARD_PAGE)}
        />
        <HeaderButton
          title="Portfolio"
          onClick={() => navigate(DASHBOARD_PAGE)}
        />
        <HeaderButton
          title="Settings"
          onClick={() => navigate(DASHBOARD_PAGE)}
        />
        <HeaderButton title="Logout" onClick={() => setOpenLogoutModal(true)} />
      </Container>
      <Modal open={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <Container maxWidth="xs">
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
              backgroundColor: Colors.GRAY,
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

export default DashboardSideBar;
