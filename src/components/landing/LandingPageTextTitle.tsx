import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fonts } from '../../constants/Constants';
import useIsMobile from '../utils/IsMobile';

const FONT_SIZE: string = '8vw';
const MOBILE_FONT_SIZE: string = '9.5vw';
const SUBTITLE_FONT_SIZE: string = '1.6vw';
const MOBILE_SUBTITLE_FONT_SIZE: string = '3.5vw';

const LandingPageTextTitle: React.FC = () => {
  const isMobile: boolean = useIsMobile();

  return (
    <>
      <Box
        sx={{
          display: 'inline',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            textAlign: 'left',
            width: '100%',
            fontSize: isMobile ? MOBILE_FONT_SIZE : FONT_SIZE,
            display: 'inline',
            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Smarter
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            textAlign: 'left',
            display: 'inline',
            width: 'auto',
            marginLeft: isMobile ? '5px' : '20px',
            fontSize: isMobile ? MOBILE_FONT_SIZE : FONT_SIZE,
            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Insights,
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            textAlign: 'left',
            fontSize: isMobile ? MOBILE_FONT_SIZE : FONT_SIZE,
            display: 'inline',
            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Simpler
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            textAlign: 'left',
            display: 'inline',
            marginLeft: isMobile ? '5px' : '20px',
            fontSize: isMobile ? MOBILE_FONT_SIZE : FONT_SIZE,
            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Investing
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            marginTop: '20px',
            fontFamily: Fonts.RALEWAY,
            fontSize: isMobile ? MOBILE_SUBTITLE_FONT_SIZE : SUBTITLE_FONT_SIZE,
            textAlign: 'left',
            width: isMobile ? '80%' : '50%',
          }}
        >
          Walter delivers AI-powered stock updates tailored to your portfolio -
          clear, concise, and straight to your inbox every week.
        </Typography>
      </Box>
    </>
  );
};

export default LandingPageTextTitle;
