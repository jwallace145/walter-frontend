import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Typography from '@mui/material/Typography';
import HomePage from './common/HomePage';

interface PortfolioPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = (
  props: PortfolioPageProps,
): React.ReactElement => {
  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'portfolio'}
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Typography variant="body2" color="textSecondary" component="div">
        Test
      </Typography>
    );
  };

  return <HomePage sideBar={getSideBar()} content={getContent()} />;
};

export default PortfolioPage;
