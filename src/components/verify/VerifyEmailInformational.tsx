import React from 'react';
import { Container, Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { REGISTER_PAGE } from '../../pages/common/Pages';
import isMobile from '../utils/IsMobile';
import useIsMobile from '../utils/IsMobile';

const TITLE_FONT_SIZE: string = '4vw';
const MOBILE_TITLE_FONT_SIZE: string = '9vw';
const SUBTITLE_FONT_SIZE: string = '1.4vw';
const MOBILE_SUBTITLE_FONT_SIZE: string = '4vw';

const VerifyEmailInformational = () => {
  const isMobile: boolean = useIsMobile();

  return (
    <Container
      sx={{
        backgroundColor: 'white',
        borderRadius: '40px',
        padding: '40px',
        width: '90%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
          }}
        >
          Verify Email
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: isMobile ? '20px' : '40px',
            fontFamily: 'Raleway',
            textAlign: 'left',
            width: '100%',
            fontSize: isMobile ? MOBILE_SUBTITLE_FONT_SIZE : SUBTITLE_FONT_SIZE,
          }}
        >
          After verifying your email, add stocks and track their performance in
          the dashboard. Walter will deliver his AI insights weekly to your
          inbox.
        </Typography>
        <Divider
          sx={{
            backgroundColor: 'black',
            height: '3px',
            marginY: 4,
            width: '20%',
            textAlign: 'left',
            justifyContent: 'left',
            borderRadius: '8px',
          }}
        ></Divider>
      </Box>
    </Container>
  );
};

export default VerifyEmailInformational;
