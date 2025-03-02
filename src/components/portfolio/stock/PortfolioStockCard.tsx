import React from 'react';
import Grid from '@mui/material/Grid2';
import { Colors, Fonts, US_DOLLAR } from '../../../constants/Constants';
import Typography from '@mui/material/Typography';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import LoadingButton from '../../button/LoadingButton';
import { Stack } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface PortfolioStockCardProps {
  stock: PortfolioStock;
}

const PortfolioStockCard: React.FC<PortfolioStockCardProps> = (
  props: PortfolioStockCardProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Grid
        container
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
          justifyContent: 'space-between',
          padding: '3px',
          marginBottom: '15px',
        }}
      >
        <Grid size={6}>
          <Stack
            sx={{
              marginLeft: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '3px',
            }}
          >
            <Typography
              onClick={() =>
                navigate('/stocks/' + props.stock.symbol.toLowerCase())
              }
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'bold',
                fontSize: '24px',
                '&:hover': {
                  color: Colors.YELLOW,
                  textDecoration: 'underline',
                },
                transition: 'color 0.3s ease, text-decoration 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {props.stock.symbol}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              {props.stock.company}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              Shares:{' '}
              {props.stock.quantity.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              Equity: {US_DOLLAR.format(props.stock.equity)}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            loading={false}
            onClick={() => {}}
            text={'Edit'}
            sx={{
              outline: `1px solid ${Colors.GRAY}`,
              backgroundColor: Colors.YELLOW,
              borderRadius: '40px',
              '&:hover': {
                backgroundColor: Colors.YELLOW_HOVER,
              },
              transition: 'background-color 0.3s ease',
              width: '20%',
              height: '35px',
              marginTop: '15px',
              marginRight: '15px',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioStockCard;
