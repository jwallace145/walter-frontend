import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { LANDING_PAGE } from './Pages';

interface HomePageProps {
  authenticated: boolean;
  sideBar: React.ReactNode;
  content: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = (
  props: HomePageProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    redirectUnauthenticatedUsers();
  }, [props.authenticated]);

  const redirectUnauthenticatedUsers: () => void = (): void => {
    if (!props.authenticated) {
      navigate(LANDING_PAGE);
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={2} spacing={2}>
        {props.sideBar}
      </Grid>
      <Grid size={10} spacing={2}>
        {props.content}
      </Grid>
    </Grid>
  );
};

export default HomePage;
