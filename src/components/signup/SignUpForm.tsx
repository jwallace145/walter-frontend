import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Container,
  CssBaseline,
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setErrorAlert(true);
      return;
    }

    try {
      setLoading(true);
      const response: CreateUserResponse = await WalterAPI.createUser(
        email,
        username,
        password,
      );
      setLoading(false);

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        setSuccess(message);
        setSuccessAlert(true);
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (error) {
      setError('Unexpected error!');
      setErrorAlert(true);
    }

    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

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
                    onClick={handleClickShowPassword}
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
                    onClick={handleClickShowConfirmPassword}
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
              padding: '10px',
              '&:hover': {
                backgroundColor: '#F1B800',
              },
              transition: 'background-color 0.3s ease',
              width: '40%',
            }}
            loading={loading}
            onClick={handleSubmit}
            text={'Sign Up'}
          />
        </Box>
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {success}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SignUpForm;
