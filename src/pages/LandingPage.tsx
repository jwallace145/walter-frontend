import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

const TITLE_FONT_SIZE: string = '8vw';
const SUBTITLE_FONT_SIZE: string = '1.6vw';

const LandingPage: React.FC = () => {
  return (
    <Grid container direction="column">
      <Grid size={12} sx={{ marginTop: '100px' }}>
        <Box
          sx={{
            display: 'inline',
            alignItems: 'center',
            marginLeft: '100px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
              fontSize: TITLE_FONT_SIZE,
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
              marginLeft: '20px',
              fontSize: TITLE_FONT_SIZE,
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Insights,
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginLeft: '100px' }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: TITLE_FONT_SIZE,
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
              marginLeft: '20px',
              fontSize: TITLE_FONT_SIZE,
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Investing
          </Typography>
        </Box>
      </Grid>
      <Grid size={6}>
        <Typography
          sx={{
            marginLeft: '100px',
            marginTop: '20px',
            fontFamily: 'Raleway',
            fontSize: SUBTITLE_FONT_SIZE,
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
            marginY: 16,
            width: '85%',
            borderRadius: '8px',
            marginLeft: '100px',
            border: 'none',
          }}></Divider>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
