import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { AddStocksResponse } from '../../api/AddStocks';

const AddStock: React.FC = () => {
  const [stock, setStock] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AddStocksResponse = await WalterAPI.addStock(
        stock,
        parseFloat(quantity),
      );

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        setSuccess(message);
        setSuccessAlert(true);
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (error) {
      setError('Unexpected error!');
      setErrorAlert(true);
    }
  };

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 5,
        backgroundColor: '#eeeeee',
        padding: 3,
        border: '2px solid #121212',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          letterSpacing: '.2rem',
        }}
      >
        Add Stock
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          margin="normal"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{
            backgroundColor: '#121212',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            letterSpacing: '.2rem',
          }}
        >
          Add Stock
        </Button>
      </form>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddStock;
