import React from 'react';
import { Container, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginInformational: React.FC = () => {
  return (
    <Container
      sx={{
        backgroundColor: 'white',
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
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            textAlign: 'left',
            width: '100%',
            marginLeft: '100px',
            fontSize: '72px',
          }}
        >
          Login
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginLeft: '100px',
            marginTop: '40px',
            fontFamily: 'Raleway',
            textAlign: 'left',
            width: '100%',
            fontSize: '18px',
          }}
        >
          Welcome back! Get the latest insights on your portfolio with Walter's
          AI-powered updates - quick, smart, and tailored just for you.
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
        <Typography
          sx={{
            marginLeft: '100px',
            marginTop: '40px',
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            fontSize: '28px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Sign in to continue
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginInformational;
