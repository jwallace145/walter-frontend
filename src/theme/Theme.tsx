import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  components: {
    MuiGrid2: {
      styleOverrides: {
        root: {
          border: '2px solid #121212',
          borderRadius: '8px',
          padding: 2,
          backgroundColor: '#eeeeee',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
          fontSize: '1rem',
          letterSpacing: '.2rem',
          color: 'inherit',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: grey[400],
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          letterSpacing: '.2rem',
        },
      },
    },
  },
});

export default theme;
