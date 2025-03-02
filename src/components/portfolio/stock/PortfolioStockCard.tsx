import React from 'react';
import Grid from '@mui/material/Grid2';
import { Colors, Fonts, US_DOLLAR } from '../../../constants/Constants';
import Typography from '@mui/material/Typography';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import LoadingButton from '../../button/LoadingButton';
import { Modal, Stack, TextField } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { WalterAPI } from '../../../api/WalterAPI';
import { AddStockResponse } from '../../../api/methods/AddStock';

interface PortfolioStockCardProps {
  stock: PortfolioStock;
  setRefresh: (refresh: boolean) => void;
}

const PortfolioStockCard: React.FC<PortfolioStockCardProps> = (
  props: PortfolioStockCardProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openEditStockModal, setOpenEditStockModal] = React.useState(false);
  const [shares, setShares] = React.useState<string>('');
  const [editStockLoading, setEditStockLoading] = React.useState(false);
  const [openDeleteStockModal, setOpenDeleteStockModal] = React.useState(false);
  const [deleteStockLoading, setDeleteStockLoading] = React.useState(false);

  const handleEditStock: (event: React.FormEvent) => void = (
    event: React.FormEvent,
  ): void => {
    event.preventDefault();
    setEditStockLoading(true);
    WalterAPI.addStock(props.stock.symbol, parseFloat(shares))
      .then((response: AddStockResponse): void => {
        if (response.isSuccess()) {
          setOpenEditStockModal(false);
          props.setRefresh(true);
        }
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setEditStockLoading(false);
      });
  };

  const getEditStockModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openEditStockModal}
          onClose={(): void => setOpenEditStockModal(false)}
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
              Edit Stock
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
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                color: Colors.BLACK,
                fontWeight: 'bold',
                textAlign: 'left',
                width: '100%',
                '&:hover': {
                  color: Colors.BLACK_HOVER,
                  textDecoration: 'underline',
                },
                transition: 'color 0.3s ease, text-decoration 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => setOpenDeleteStockModal(true)}
            >
              Delete?
            </Typography>
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
              loading={editStockLoading}
              onClick={handleEditStock}
              text={'Edit'}
            />
          </Box>
        </Modal>
      );
    };

  const handleDeleteStock: () => void = (): void => {
    setDeleteStockLoading(true);
    WalterAPI.deleteStock(props.stock.symbol)
      .then((response: AddStockResponse): void => {
        if (response.isSuccess()) {
          setOpenEditStockModal(false);
          setOpenDeleteStockModal(false);
          props.setRefresh(true);
        }
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setDeleteStockLoading(false);
      });
  };

  const getDeleteStockModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openEditStockModal}
          onClose={(): void => setOpenEditStockModal(false)}
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
              Delete Stock
            </Typography>
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
              loading={deleteStockLoading}
              onClick={handleDeleteStock}
              text={'Delete'}
            />
          </Box>
        </Modal>
      );
    };

  return (
    <>
      <Grid
        container
        size={12}
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
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
            onClick={(): void => setOpenEditStockModal(true)}
            text={'Edit'}
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
      {openEditStockModal && getEditStockModal()}
      {openDeleteStockModal && getDeleteStockModal()}
    </>
  );
};

export default PortfolioStockCard;
