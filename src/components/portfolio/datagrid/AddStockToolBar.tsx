import React, { useState } from 'react';
import { WalterAPI } from '../../../api/WalterAPI';
import { GridToolbarContainer } from '@mui/x-data-grid';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoadingButton from '../../button/LoadingButton';

interface AddStockToolBarProps {
  setRefresh: (newRefresh: boolean) => void;
}

const AddStockToolbar: React.FC<AddStockToolBarProps> = (props) => {
  const [openAddStockModal, setOpenAddStockModal] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOpenAddStockModal = () => setOpenAddStockModal(true);

  const handleCloseAddStockModal = () => setOpenAddStockModal(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      WalterAPI.addStock(symbol, parseFloat(quantity))
        .then((response) => {
          if (response.isSuccess()) {
            props.setRefresh(true);
          } else {
            setError(true);
            setErrorMessage(response.getMessage());
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleOpenAddStockModal}>
        Add Stock
      </Button>
      <Modal open={openAddStockModal} onClose={handleCloseAddStockModal}>
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
              {error ? (
                <Alert severity="error" onClose={() => setError(false)}>
                  {errorMessage}
                </Alert>
              ) : (
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  text={'ADD STOCK'}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Modal>
    </GridToolbarContainer>
  );
};

export default AddStockToolbar;
