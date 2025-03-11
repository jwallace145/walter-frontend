import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import PortfolioStockTile from './PortfolioStockTile';
import { Avatar, Box, Container, Modal, Stack, TextField } from '@mui/material';
import styles from './PortfolioStockExplorer.module.scss';
import LoadingButton from '../../button/LoadingButton';
import { Colors } from '../../../constants/Constants';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { WalterAPI } from '../../../api/WalterAPI';
import { AddStockResponse } from '../../../api/methods/AddStock';
import Typography from '@mui/material/Typography';

interface PortfolioStockExplorerProps {
  stocks: PortfolioStock[];
  setRefresh: (refresh: boolean) => void;
}

const PortfolioStockExplorer: React.FC<PortfolioStockExplorerProps> = (
  props: PortfolioStockExplorerProps,
): React.ReactElement => {
  const [addStockLoading, setAddStockLoading] = React.useState<boolean>(false);
  const [openAddStockModal, setOpenAddStockModal] =
    React.useState<boolean>(false);
  const [symbol, setSymbol] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<string>('');

  const getToolbar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container className={styles.PortfolioStockExplorer__container}>
        <LoadingButton
          loading={false}
          onClick={(): void => setOpenAddStockModal(true)}
          text={'Add'}
          sx={{
            backgroundColor: Colors.YELLOW,
            borderRadius: '40px',
            padding: '4px',
            '&:hover': {
              transform: 'scale(1.03)',
              backgroundColor: Colors.YELLOW_HOVER,
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease',
            width: '10%',
            marginRight: '10px',
          }}
        />
      </Grid>
    );
  };

  const getPortfolioStocks: (stocks: PortfolioStock[]) => React.ReactElement = (
    stocks: PortfolioStock[],
  ): React.ReactElement => {
    if (stocks.length === 0) {
      return (
        <Typography className={styles.PortfolioStockExplorer__title}>
          No stocks in portfolio...
        </Typography>
      );
    }
    return (
      <Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
        {stocks.map(
          (stock: PortfolioStock): React.ReactElement => (
            <PortfolioStockTile stock={stock} setRefresh={props.setRefresh} />
          ),
        )}
      </Stack>
    );
  };

  const getAddStockModal: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Modal
        open={openAddStockModal}
        onClose={() => setOpenAddStockModal(false)}
      >
        <Container maxWidth="xs">
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
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Avatar sx={{ m: 2 }}>
              <AccountBalanceIcon />
            </Avatar>
            <Box sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="symbol"
                label="Stock Symbol"
                name="email"
                autoFocus
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Number of Shares"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <LoadingButton
                loading={addStockLoading}
                onClick={handleAddStock}
                text={'Add Stock'}
              />
            </Box>
          </Box>
        </Container>
      </Modal>
    );
  };

  const handleAddStock: () => void = (): void => {
    setAddStockLoading(true);
    WalterAPI.addStock(symbol, parseFloat(quantity))
      .then((response: AddStockResponse): void => {
        if (response.isSuccess()) {
          props.setRefresh(true);
        }
      })
      .catch((error: Error): void => console.log(error))
      .finally((): void => {
        setOpenAddStockModal(false);
        setAddStockLoading(false);
      });
  };

  return (
    <>
      {getToolbar()}
      {getPortfolioStocks(props.stocks)}
      {openAddStockModal && getAddStockModal()}
    </>
  );
};

export default PortfolioStockExplorer;
