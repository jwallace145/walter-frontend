import React from 'react';
import { Colors, Fonts } from '../../constants/Constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Divider } from '@mui/material';

const NewsletterSubscriptionSuccessInformational: React.FC = () => {
  return (
    <Container
      sx={{
        backgroundColor: Colors.WHITE,
        borderRadius: '40px',
        marginTop: '120px',
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
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            textAlign: 'left',
            width: '100%',
            marginLeft: '100px',
            fontSize: '72px',
          }}
        >
          Welcome to Walter's Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginLeft: '100px',
            marginTop: '40px',
            fontFamily: Fonts.RALEWAY,
            textAlign: 'left',
            width: '100%',
            fontSize: '18px',
          }}
        >
          Check your inbox for the latest AI updates about your portfolio.
        </Typography>
        <Divider
          sx={{
            backgroundColor: Colors.BLACK,
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

export default NewsletterSubscriptionSuccessInformational;
