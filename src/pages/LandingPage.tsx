import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import WalterLandingPage1 from '../components/landing/walter-landing-page-1.png';
import WalterLandingPage2 from '../components/landing/walter-landing-page-2.png';
import WalterLandingPage3 from '../components/landing/walter-landing-page-3.png';
import LoadingButton from '../components/button/LoadingButton';
import { LOGIN_PAGE } from './common/Pages';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useIsMobile from '../components/utils/isMobile';

const TITLE_FONT_SIZE: string = '8vw';
const MOBILE_TITLE_FONT_SIZE: string = '9.5vw';
const SUBTITLE_FONT_SIZE: string = '1.6vw';
const MOBILE_SUBTITLE_FONT_SIZE: string = '3vw';

const LandingPage: React.FC = () => {
  const isMobile: boolean = useIsMobile();
  const navigate: NavigateFunction = useNavigate();

  return (
    <Grid container direction="column">
      <Grid size={12} sx={{ marginTop: isMobile ? '40px' : '100px' }}>
        <Box
          sx={{
            display: 'inline',
            alignItems: 'center',
            marginLeft: isMobile ? '40px' : '100px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
              fontSize: isMobile ? MOBILE_TITLE_FONT_SIZE : TITLE_FONT_SIZE,
              display: 'inline',
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Smarter
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'normal',
              textAlign: 'left',
              display: 'inline',
              width: 'auto',
              marginLeft: isMobile ? '5px' : '20px',
              fontSize: isMobile ? MOBILE_TITLE_FONT_SIZE : TITLE_FONT_SIZE,
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Insights,
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginLeft: isMobile ? '40px' : '100px' }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: isMobile ? MOBILE_TITLE_FONT_SIZE : TITLE_FONT_SIZE,
              display: 'inline',
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Simpler
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'normal',
              textAlign: 'left',
              display: 'inline',
              marginLeft: isMobile ? '5px' : '20px',
              fontSize: isMobile ? MOBILE_TITLE_FONT_SIZE : TITLE_FONT_SIZE,
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Investing
          </Typography>
        </Box>
      </Grid>
      <Grid size={6}>
        <Typography
          sx={{
            marginLeft: isMobile ? '40px' : '100px',
            marginTop: '20px',
            fontFamily: 'Raleway',
            fontSize: isMobile ? MOBILE_SUBTITLE_FONT_SIZE : SUBTITLE_FONT_SIZE,
            textAlign: 'left',
            width: '100%',
          }}
        >
          Walter delivers AI-powered stock updates tailored to your portfolio -
          clear, concise, and straight to your inbox every week.
        </Typography>
      </Grid>
      <Grid size={12}>
        <Divider
          sx={{
            backgroundColor: '#FFD213',
            height: '3px',
            marginY: isMobile ? 4 : 8,
            width: '85%',
            borderRadius: '8px',
            marginLeft: isMobile ? '40px' : '100px',
            border: 'none',
          }}
        ></Divider>
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          sx={{ alignItems: 'left' }}
        >
          <Grid size={3}>
            <img
              src={WalterLandingPage1}
              alt="walter-step-1-create-account"
              style={{
                width: 'auto',
                height: '100px',
                marginLeft: isMobile ? '40px' : '100px',
              }}
            />
          </Grid>
          <Grid size={3}>
            <img
              src={WalterLandingPage2}
              alt="walter-step-2-verify-email-address"
              style={{
                width: 'auto',
                height: '100px',
                marginLeft: '40px',
              }}
            />
          </Grid>
          <Grid size={3}>
            <img
              src={WalterLandingPage3}
              alt="walter-step-3-subscribe-to-newsletter"
              style={{
                width: 'auto',
                height: '100px',
                marginLeft: isMobile ? '40px' : '0px',
              }}
            />
          </Grid>
          <Grid size={3}>
            <LoadingButton
              sx={{
                backgroundColor: '#FFD213',
                borderRadius: '40px',
                padding: isMobile ? '5px' : '10px',
                '&:hover': {
                  backgroundColor: '#F1B800',
                },
                transition: 'background-color 0.3s ease',
                width: isMobile ? '150%' : '60%',
                marginTop: isMobile ? '20px' : '0px',
                marginLeft: isMobile ? '40px' : '0px',
              }}
              loading={false}
              onClick={() => navigate(LOGIN_PAGE)}
              text={'Get Started'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
