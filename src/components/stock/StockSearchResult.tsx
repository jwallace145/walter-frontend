import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { StockSearch } from '../../api/methods/SearchStocks';
import { Business } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MapIcon from '@mui/icons-material/Map';

interface StockSearchResultProps {
  stock: StockSearch;
}

const StockSearchResult: React.FC<StockSearchResultProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = () => {
    navigate(`/stocks/${props.stock.symbol.toLowerCase()}`);
  };

  return (
    <>
      <Link
        onClick={handleClick}
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: 800,
            margin: 'auto',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {props.stock.name}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Business sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Symbol:
                </Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {props.stock.symbol}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Type:
                </Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {props.stock.type}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MapIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Region:
                </Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {props.stock.region}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default StockSearchResult;
