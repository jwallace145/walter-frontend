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
import { useLocation } from 'react-router-dom';

interface NewslettersPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const NewslettersPage: React.FC<NewslettersPageProps> = (
  props: NewslettersPageProps,
): React.ReactElement => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect((): void => {
    getNewsletters();
  }, []);

  const getNewsletters: () => void = (): void => {
    setLoading(true);
    WalterAPI.getNewsletters()
      .then((response: GetNewslettersResponse): void => {
        if (response.isSuccess()) {
          setNewsletters(response.getNewsletters());
        }
      })
      .catch((error: Error): any => console.log(error))
      .finally((): any => setLoading(false));
  };

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'newsletters'}
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    if (loading) {
      return <LoadingCircularProgress />;
    }

    if (newsletters.length === 0) {
      return <Typography>No newsletters found</Typography>;
    }

    return (
      <>
        {newsletters.map(
          (newsletter: Newsletter): React.ReactElement => (
            <ArchivedNewsletterCard newsletter={newsletter} />
          ),
        )}
      </>
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

export default NewslettersPage;
