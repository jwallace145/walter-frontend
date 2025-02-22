import React from 'react';
import { Container, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const SignUpInformational: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

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
          Create New Account
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
          Stay on top of your investments without the hassle. Walter delivers
          AI-powered insights tailored to your portfolio - clear, concise, and
          straight to your inbox every week.
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
          Already Registered?
        </Typography>
        <LoadingButton
          sx={{
            backgroundColor: '#FFD213',
            borderRadius: '40px',
            marginTop: '40px',
            marginBottom: '20px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#F1B800',
            },
            transition: 'background-color 0.3s ease',
            width: '40%',
          }}
          loading={false}
          onClick={handleLoginRedirect}
          text={'Login'}
        />
      </Box>
    </Container>
  );
};

export default SignUpInformational;
