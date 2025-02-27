import React from 'react';
import { Container, Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { REGISTER_PAGE } from '../../pages/common/Pages';
import { Colors, Fonts } from '../../constants/Constants';

const LoginInformational: React.FC = () => {
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
          Login
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
          Welcome back! Get the latest insights on your portfolio with Walter's
          AI-powered updates - quick, smart, and tailored just for you.
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
        <Typography
          sx={{
            marginLeft: '100px',
            marginTop: '40px',
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            fontSize: '28px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Don't have an account?
          <Link
            href={REGISTER_PAGE}
            variant="body2"
            sx={{
              marginLeft: '5px',
              marginTop: '20px',
              color: Colors.BLACK,
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
              textDecoration: 'none',
              '&:hover': {
                color: Colors.YELLOW,
                textDecoration: 'underline',
              },
              fontSize: '28px',
              transition: 'color 0.3s ease, text-decoration 0.3s ease',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginInformational;
