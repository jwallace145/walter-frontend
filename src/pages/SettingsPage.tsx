import React, { useEffect } from 'react';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import Grid from '@mui/material/Grid2';
import UserDetailsCard from '../components/users/UserDetailsCard';
import { User } from '../api/methods/GetUser';
import UserSubscriptionStatusCard from '../components/users/UserSubscriptionStatusCard';

interface SettingsPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  user: User;
}

const SettingsPage: React.FC<SettingsPageProps> = (
  props: SettingsPageProps,
): React.ReactElement => {
  useEffect((): void => {}, []);

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'settings'}
      />
    );
  };

  // add user card and payment/subscription status card
  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container spacing={2}>
        <Grid size={5}>
          <UserDetailsCard user={props.user} />
        </Grid>
      </Grid>
    );
  };

  return (
    <HomePage
      authenticated={props.authenticated}
      sideBar={getSideBar()}
      content={getContent()}
    />
  );
};

export default SettingsPage;
