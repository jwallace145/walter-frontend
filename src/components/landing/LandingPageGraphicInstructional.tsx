import React from 'react';
import Grid from '@mui/material/Grid2';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useIsMobile from '../utils/IsMobile';
import WalterLandingPage1 from './media/walter-landing-page-1.png';
import WalterLandingPage2 from './media/walter-landing-page-2.png';
import WalterLandingPage3 from './media/walter-landing-page-3.png';
import { Colors } from '../../constants/Constants';
import { LOGIN_PAGE } from '../../pages/common/Pages';
import LoadingButton from '../button/LoadingButton';

const GRAPHIC_INSTRUCTIONAL_WIDTH: string = '80%';
const MOBILE_GRAPHIC_INSTRUCTIONAL_WIDTH: string = '190%';

const LandingPageGraphicInstructional: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const isMobile: boolean = useIsMobile();

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      sx={{ alignItems: 'left' }}
      size={12}
    >
      <Grid size={3}>
        <img
          src={WalterLandingPage1}
          alt="walter-step-1-create-account"
          style={{
            width: isMobile
              ? MOBILE_GRAPHIC_INSTRUCTIONAL_WIDTH
              : GRAPHIC_INSTRUCTIONAL_WIDTH,
            height: 'auto',
          }}
        />
      </Grid>
      <Grid size={3}>
        <img
          src={WalterLandingPage2}
          alt="walter-step-2-verify-email-address"
          style={{
            width: isMobile
              ? MOBILE_GRAPHIC_INSTRUCTIONAL_WIDTH
              : GRAPHIC_INSTRUCTIONAL_WIDTH,
            height: 'auto',
          }}
        />
      </Grid>
      <Grid size={3}>
        <img
          src={WalterLandingPage3}
          alt="walter-step-3-subscribe-to-newsletter"
          style={{
            width: isMobile
              ? MOBILE_GRAPHIC_INSTRUCTIONAL_WIDTH
              : GRAPHIC_INSTRUCTIONAL_WIDTH,
            height: 'auto',
          }}
        />
      </Grid>
      <Grid size={3}>
        <LoadingButton
          sx={{
            backgroundColor: Colors.YELLOW,
            borderRadius: '40px',
            padding: isMobile ? '5px' : '10px',
            '&:hover': {
              backgroundColor: Colors.YELLOW_HOVER,
            },
            transition: 'background-color 0.3s ease',
            width: isMobile ? '150%' : '50%',
            marginTop: '20px',
          }}
          loading={false}
          onClick={() => navigate(LOGIN_PAGE)}
          text={'Get Started'}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPageGraphicInstructional;
