import React, { useState } from 'react';
import {
  Alert,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { CreateUserResponse } from '../../api/methods/CreateUser';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { isValidEmail, isValidUsername } from '../../constants/Constants';
import { LOGIN_PAGE } from '../../pages/common/Pages';
import useIsMobile from '../utils/isMobile';

interface SignUpFormProps {
  setSentEmailVerificationAlert: (sentEmailVerification: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const isMobile: boolean = useIsMobile();
  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // early return if sign up form contains invalid user inputs
    if (!validateSignUpFormFields(email, username, password, confirmPassword)) {
      return;
    }

    createUserInDatabase(email, username, password);
    clearSignUpFormFields();
  };

  const validateSignUpFormFields = (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ): boolean => {
    if (!isValidEmail(email)) {
      setError('Invalid email address!');
      setErrorAlert(true);
      return false;
    } else if (!isValidUsername(username)) {
      setError('Invalid username!');
      setErrorAlert(true);
      return false;
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setErrorAlert(true);
      return false;
    }
    return true;
  };

  const createUserInDatabase = (
    email: string,
    username: string,
    password: string,
  ): void => {
    setLoading(true);
    WalterAPI.createUser(email, username, password)
      .then((response: CreateUserResponse) => {
        if (response.isSuccess()) {
          props.setSentEmailVerificationAlert(true);
          navigate(LOGIN_PAGE);
        } else {
          setError(response.getMessage());
          setErrorAlert(true);
        }
      })
      .catch((e) => {
        setError('Unexpected error occurred!');
        setErrorAlert(true);
      })
      .finally(() => setLoading(false));
  };

  const clearSignUpFormFields = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: '#cccccc',
          borderRadius: '40px',
          padding: '40px',
          width: '80%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
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
            sx={{ fontFamily: 'Raleway', fontWeight: '700' }}
          >
            Register
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              fontFamily: 'Raleway',
              fontWeight: 600,
              textAlign: 'left',
              width: '100%',
            }}
          >
            Email
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '16px',
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              fontFamily: 'Raleway',
              fontWeight: 600,
              textAlign: 'left',
              width: '100%',
            }}
          >
            Username
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '16px',
              },
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              fontFamily: 'Raleway',
              fontWeight: 600,
              textAlign: 'left',
              width: '100%',
            }}
          >
            Password
          </Typography>
          <FormControl
            fullWidth
            required
            sx={{
              marginTop: '20px',
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
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
              fontFamily: 'Raleway',
              fontWeight: 600,
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
              marginTop: '20px',
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
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            sx={{
              backgroundColor: '#FFD213',
              borderRadius: '40px',
              marginTop: '20px',
              marginBottom: '20px',
              padding: isMobile ? '8px' : '10px',
              '&:hover': {
                backgroundColor: '#F1B800',
              },
              transition: 'background-color 0.3s ease',
              width: isMobile ? '80%' : '40%',
            }}
            loading={loading}
            onClick={handleSubmit}
            text={'Sign Up'}
          />
        </Box>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={() => setErrorAlert(false)}
        >
          <Alert onClose={() => setErrorAlert(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SignUpForm;
