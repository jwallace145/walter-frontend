import React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface NoStocksInUserPortfolioAlertProps {
  noStocksInUserPortfolio: boolean;
  setNoStocksInUserPortfolio: (noStocksInUserPortfolio: boolean) => void;
}

const NoStocksInUserPortfolioAlert: React.FC<
  NoStocksInUserPortfolioAlertProps
> = (props: NoStocksInUserPortfolioAlertProps) => {
  return (
    <>
      <Snackbar
        open={props.noStocksInUserPortfolio}
        onClose={(e) => props.setNoStocksInUserPortfolio(false)}
      >
        <Alert
          onClose={(e) => props.setNoStocksInUserPortfolio(false)}
          severity="warning"
        >
          No stocks in portfolio! Add stocks on the dashboard page.
        </Alert>
      </Snackbar>
    </>
  );
};

export default NoStocksInUserPortfolioAlert;
