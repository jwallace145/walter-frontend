import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangePasswordResponse } from '../../api/methods/ChangePassword';
import { LOGIN_PAGE } from '../../pages/common/Pages';
import { WalterAPI } from '../../api/WalterAPI';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '../button/LoadingButton';

/**
 * The name of the token key given in the URL query params used
 * to authenticate the ChangePassword API call for the given user.
 *
 * E.g.: https://walterai.dev/password?token=TEST_TOKEN
 */
const CHANGE_PASSWORD_TOKEN: string = 'token';

const ChangePasswordForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  /**
   * The change password token is given as a URL query parameter with name `token`.
   *
   * The token is used to authenticate the request and ensure that only people with
   * access to the user's email can change their password.
   */
  const getChangePasswordToken: () => string | null = (): string | null => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(CHANGE_PASSWORD_TOKEN);
  };

  const handleChangePassword = async (
    event: React.FormEvent,
  ): Promise<void> => {
    event.preventDefault();

    // confirm new password and confirm new password are equal
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match!');
      setErrorAlert(true);
      return;
    }

    // verify change password token is valid
    const token: string | null = getChangePasswordToken();
    if (token === null || token === undefined) {
      setError('Invalid token!');
      setErrorAlert(true);
      return;
    }

    // call ChangePassword API with token and new password candidate
    setLoading(true);
    WalterAPI.changePassword(token, newPassword)
      .then((response: ChangePasswordResponse) => {
        const message: string = response.getMessage();
        if (response.isSuccess()) {
          navigate(LOGIN_PAGE);
        } else {
          setError(message);
          setErrorAlert(true);
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  return (
    <>
      <Container
        sx={{
          backgroundColor: '#cccccc',
          borderRadius: '40px',
          marginTop: '120px',
          marginRight: '120px',
          padding: '40px',
          width: '80%',
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
            variant="h4"
            sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}
          >
            Change Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              marginBottom: '10px',
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
            }}
          >
            New Password
          </Typography>
          <FormControl
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showNewPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              marginBottom: '10px',
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
            }}
          >
            Confirm Password
          </Typography>
          <FormControl
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmNewPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showNewPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowConfirmNewPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
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
            loading={loading}
            onClick={handleChangePassword}
            text={'Submit'}
          />
        </Box>
      </Container>
    </>
  );
};

export default ChangePasswordForm;
