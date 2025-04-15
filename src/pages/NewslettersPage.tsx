import React, { useEffect, useState } from 'react';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import { Typography } from '@mui/material';
import { WalterAPI } from '../api/WalterAPI';
import {
  GetNewslettersResponse,
  Newsletter,
} from '../api/methods/GetNewsletters';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import ArchivedNewsletterCard from '../components/newsletter/ArchivedNewsletterCard';
import Grid from '@mui/material/Grid2';
import ArchivedNewsletterExplorer from '../components/newsletter/ArchivedNewsletterExplorer';

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
    return <ArchivedNewsletterExplorer />;
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
