import React, { useEffect, useState } from 'react';
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { WalterAPI } from '../api/WalterAPI';
import { SearchStocksResponse, StockSearch } from '../api/methods/SearchStocks';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import StockSearchResult from '../components/stock/StockSearchResult';

const SearchStocksPage: React.FC = () => {
  const params: Readonly<Params> = useParams();
  const navigate: NavigateFunction = useNavigate();
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

  if (stocksLoading) {
    return <LoadingCircularProgress />;
  }

  if (!stocks || stocks.length === 0) {
    return <Typography variant="h6">No stocks found</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Results ({stocks.length})
      </Typography>
      <Grid
        container
        direction="column"
        size={12}
        spacing={2}
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {stocks.map((stock) => (
          <StockSearchResult stock={stock} />
        ))}
      </Grid>
    </Box>
  );
};

export default SearchStocksPage;
