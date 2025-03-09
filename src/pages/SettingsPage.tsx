import React, { useEffect } from 'react';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import Grid from '@mui/material/Grid2';
import UserSettings from '../components/users/UserSettings';
import { User } from '../api/methods/GetUser';

interface SettingsPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  user: User;
  setRefresh: (refresh: boolean) => void;
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
          <UserSettings user={props.user} setRefresh={props.setRefresh} />
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
