import React from 'react';
import { Container, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useIsMobile from '../utils/IsMobile';

const TITLE_FONT_SIZE: string = '4vw';
const MOBILE_TITLE_FONT_SIZE: string = '9vw';
const SUBTITLE_FONT_SIZE: string = '1.4vw';
const MOBILE_SUBTITLE_FONT_SIZE: string = '4vw';

const UnsubscribeInformational = () => {
  const isMobile: boolean = useIsMobile();

  return (
    <Container
      sx={{
        backgroundColor: 'white',
        borderRadius: '40px',
        marginTop: isMobile ? '20px' : '120px',
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
          Unsubscribe
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: '40px',
            fontFamily: 'Raleway',
            textAlign: 'left',
            width: '100%',
            fontSize: isMobile ? MOBILE_SUBTITLE_FONT_SIZE : SUBTITLE_FONT_SIZE,
          }}
        >
          You can resubscribe at anytime to Walter's newsletter when you're
          ready.
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

export default UnsubscribeInformational;
