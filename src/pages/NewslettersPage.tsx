import React from 'react';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import { Typography } from '@mui/material';

interface NewslettersPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const NewslettersPage: React.FC<NewslettersPageProps> = (
  props: NewslettersPageProps,
): React.ReactElement => {
  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'newsletters'}
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return <Typography>Yo</Typography>;
  };

  return (
    <HomePage
      authenticated={props.authenticated}
      sideBar={getSideBar()}
      content={getContent()}
    />
  );
};

export default NewslettersPage;
