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
import HoverableTextLink from '../../text/HoverableTextLink';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import styles from './PortfolioStockTile.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface PortfolioStockCardProps {
  stock: PortfolioStock;
  setRefresh: (refresh: boolean) => void;
}

const PortfolioStockTile: React.FC<PortfolioStockCardProps> = (
  props: PortfolioStockCardProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [shares, setShares] = React.useState<string>('');
  const [openEditStockModal, setOpenEditStockModal] = React.useState(false);
  const [editStockLoading, setEditStockLoading] = React.useState(false);
  const [openDeleteStockModal, setOpenDeleteStockModal] = React.useState(false);
  const [deleteStockLoading, setDeleteStockLoading] = React.useState(false);

  const handleSymbolClick: () => void = (): void => {
    navigate(`/stocks/${props.stock.symbol.toLowerCase()}`);
  };

  const getSymbolLogo: (symbol: string) => React.ReactElement = (
    symbol: string,
  ): React.ReactElement => {
    return (
      <Box
        component="img"
        onClick={handleSymbolClick}
        className={styles.PortfolioStockTile__logo}
        src={`https://assets.parqet.com/logos/symbol/${symbol.toUpperCase()}`}
        alt={symbol.toUpperCase()}
        sx={{
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
        }}
      />
    );
  };

  const getEditStockModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openEditStockModal}
          onClose={(): void => setOpenEditStockModal(false)}
        >
          <Box className={styles.PortfolioStockTile__modal}>
            <Typography
              variant="h5"
              className={styles.PortfolioStockTile__textBold}
              sx={{
                marginBottom: '10px',
              }}
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

  const getDeleteStockModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openDeleteStockModal}
          onClose={(): void => setOpenDeleteStockModal(false)}
        >
          <Box className={styles.PortfolioStockTile__modal}>
            <Typography
              variant="h5"
              className={styles.PortfolioStockTile__textBold}
              sx={{
                marginBottom: '10px',
              }}
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

  return (
    <>
      <Grid size={3} className={styles.PortfolioStockTile__container}>
        <Stack className={styles.PortfolioStockTile__stack}>
          <Stack direction="row" className={styles.PortfolioStockTile__toolbar}>
            <DeleteOutlineIcon
              className={styles.PortfolioStockTile__delete}
              onClick={(): void => setOpenDeleteStockModal(true)}
            />
            <DriveFileRenameOutlineIcon
              className={styles.PortfolioStockTile__edit}
              onClick={(): void => setOpenEditStockModal(true)}
            />
          </Stack>
          <HoverableTextLink
            text={props.stock.symbol}
            onClick={handleSymbolClick}
            sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}
          />
          {getSymbolLogo(props.stock.symbol)}
          <Typography className={styles.PortfolioStockTile__text}>
            <Typography className={styles.PortfolioStockTile__textBold}>
              Equity:{' '}
            </Typography>
            {US_DOLLAR.format(props.stock.equity)}
          </Typography>
          <Typography className={styles.PortfolioStockTile__text}>
            <Typography className={styles.PortfolioStockTile__textBold}>
              Shares:{' '}
            </Typography>
            {props.stock.quantity}
          </Typography>
        </Stack>
      </Grid>
      {openEditStockModal && getEditStockModal()}
      {openDeleteStockModal && getDeleteStockModal()}
    </>
  );
};

export default PortfolioStockTile;
