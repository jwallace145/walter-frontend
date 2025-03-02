import React from 'react';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import { Typography } from '@mui/material';

interface SettingsPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = (
  props: SettingsPageProps,
): React.ReactElement => {
  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'settings'}
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return <Typography>Yo</Typography>;
  };

  return <HomePage sideBar={getSideBar()} content={getContent()} />;
};

export default SettingsPage;
