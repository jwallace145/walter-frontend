import React from 'react';
import Grid from '@mui/material/Grid2';

interface HomePageProps {
  sideBar: React.ReactNode;
  content: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = (
  props: HomePageProps,
): React.ReactElement => {
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
