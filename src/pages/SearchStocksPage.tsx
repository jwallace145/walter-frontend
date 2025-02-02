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
        Search Results ({stocks.length} Stocks)
      </Typography>
      <Grid container direction="column" spacing={2}>
        {stocks.map((stock) => (
          <Grid>
            <Link
              onClick={() => navigate(`/stocks/${stock.symbol.toLowerCase()}`)}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <Card
                variant="outlined"
                sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {stock.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Symbol: {stock.symbol}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {stock.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Region: {stock.region}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchStocksPage;
