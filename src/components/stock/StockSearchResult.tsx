import {
  Alert,
  Box,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { StockSearch } from '../../api/methods/SearchStocks';
import { Colors, Fonts } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';
import { AddStockResponse } from '../../api/methods/AddStock';

interface StockSearchResultProps {
  sx?: object;
  stock: StockSearch;
}

const StockSearchResult: React.FC<StockSearchResultProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const [openAddStockModal, setOpenAddStockModal] = useState(false);
  const [shares, setShares] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

  const getAddStockModal: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Modal
        open={openAddStockModal}
        onClose={(): void => setOpenAddStockModal(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: Colors.LIGHT_GRAY,
            borderRadius: 4,
            boxShadow: 24,
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: Fonts.RALEWAY, fontWeight: 'bold' }}
          >
            Add Stock
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              fontFamily: Fonts.RALEWAY,
              fontWeight: 600,
              textAlign: 'left',
              width: '100%',
            }}
          >
            Number of Shares
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="shares"
            label="Shares"
            name="shares"
            autoFocus
            value={shares}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '16px',
              },
            }}
            onChange={(e) => setShares(e.target.value)}
          />
          <LoadingButton
            sx={{
              backgroundColor: Colors.YELLOW,
              borderRadius: '40px',
              padding: '8px',
              '&:hover': {
                backgroundColor: Colors.YELLOW_HOVER,
              },
              transition: 'background-color 0.3s ease',
              width: '40%',
            }}
            loading={loading}
            onClick={handleAddStock}
            text={'Add'}
          />
        </Box>
      </Modal>
    );
  };

  const handleAddStock: () => void = (): void => {
    setLoading(true);
    WalterAPI.addStock(props.stock.symbol, parseFloat(shares))
      .then((response: AddStockResponse): void => {
        if (response.isSuccess()) {
          setOpenAddStockModal(false);
          setOpenSuccessAlert(true);
        }
      })
      .catch((error: Error): void => console.log(error))
      .finally((): void => setLoading(false));
  };

  const getSuccessAlert: (message: string) => React.ReactElement = (
    message: string,
  ): React.ReactElement => {
    return (
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={(e) => setOpenSuccessAlert(false)}
      >
        <Alert onClose={(e) => setOpenSuccessAlert(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      <Grid
        container
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
          padding: '3px',
          marginBottom: '15px',
          ...props.sx,
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
              onClick={(): void =>
                navigate(`/stocks/${props.stock.symbol.toLowerCase()}`)
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
              {props.stock.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              {props.stock.region}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              {props.stock.type}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            loading={false}
            onClick={(): void => setOpenAddStockModal(true)}
            text={'Add'}
            sx={{
              outline: `1px solid ${Colors.GRAY}`,
              backgroundColor: Colors.YELLOW,
              borderRadius: '40px',
              '&:hover': {
                backgroundColor: Colors.YELLOW_HOVER,
              },
              transition: 'background-color 0.3s ease',
              width: '25%',
              height: '35px',
              marginTop: '15px',
              marginRight: '15px',
            }}
          />
        </Grid>
      </Grid>
      {openAddStockModal && getAddStockModal()}
      {getSuccessAlert('Added stock to portfolio!')}
    </>
  );
};

export default StockSearchResult;
