import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { WalterAPI } from '../api/WalterAPI';
import { SearchStocksResponse, StockSearch } from '../api/methods/SearchStocks';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import { Box, Typography } from '@mui/material';
import StockSearchResult from '../components/stock/StockSearchResult';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';

interface SearchStocksPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const SearchStocksPage: React.FC<SearchStocksPageProps> = (
  props: SearchStocksPageProps,
): React.ReactElement => {
  const params: Readonly<Params> = useParams();
  const [stocksLoading, setStocksLoading] = useState(false);
  const [stocks, setStocks] = useState<StockSearch[]>([]);

  useEffect(() => {
    setStocksLoading(true);
    WalterAPI.searchStocks(params.symbol as string)
      .then((response: SearchStocksResponse) => {
        setStocks(response.getStocks());
      })
      .finally(() => setStocksLoading(false));
  }, [params.symbol]);

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar setAuthenticated={props.setAuthenticated} currentTab="none" />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    if (stocksLoading) {
      return <LoadingCircularProgress />;
    }

    if (!stocks || stocks.length === 0) {
      return <Typography variant="h6">No stocks found</Typography>;
    }

    return (
      <>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {stocks.map(
            (stock: StockSearch): React.ReactElement => (
              <StockSearchResult stock={stock} sx={{ marginTop: '10px' }} />
            ),
          )}
        </Box>
      </>
    );
  };

  return (
    <HomePage
      sideBar={getSideBar()}
      content={getContent()}
      authenticated={true}
    />
  );
};

export default SearchStocksPage;
