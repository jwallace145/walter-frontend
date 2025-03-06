import React from 'react';
import { Colors, Fonts, formatDate } from '../../constants/Constants';
import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { User } from '../../api/methods/GetUser';

interface UserDetailsCardProps {
  user: User;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = (
  props: UserDetailsCardProps,
): React.ReactElement => {
  return (
    <Grid
      container
      sx={{
        borderRadius: '40px',
        backgroundColor: Colors.LIGHT_GRAY,
        outline: '1px solid ' + Colors.GRAY,
        padding: '3px',
        marginBottom: '15px',
      }}
    >
      <Stack
        sx={{
          marginLeft: '20px',
          marginTop: '10px',
          marginBottom: '10px',
          padding: '3px',
        }}
      >
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline',
            }}
          >
            Email:{' '}
          </Typography>
          {props.user?.email}
        </Typography>
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline',
            }}
          >
            Username:{' '}
          </Typography>
          {props.user.username}
        </Typography>
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline',
            }}
          >
            Subscribed:{' '}
          </Typography>
          {props.user.subscribed ? 'Subscribed' : 'Not subscribed'}
        </Typography>
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline',
            }}
          >
            Verified:{' '}
          </Typography>
          {props.user.verified ? 'Verified' : 'Not verified'}
        </Typography>
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline',
            }}
          >
            Sign Up Date:{' '}
          </Typography>
          {formatDate(props.user.signUpDate, 'yyyy-mm-dd')}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default UserDetailsCard;
