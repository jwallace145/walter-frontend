import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarContainer } from '@mui/x-data-grid';
import PaidIcon from '@mui/icons-material/Paid';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';

const ExpensesDataGridToolBar: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] =
    React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>('');
  const [vendor, setVendor] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    WalterAPI.addExpense(date, vendor, parseFloat(amount))
      .then((response) => {
        if (response.isSuccess()) {
          setOpenAddExpenseModal(false);
        } else {
          console.log(response.getMessage());
        }
      })
      .finally((): void => setLoading(false));
  };

  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        onClick={(): void => setOpenAddExpenseModal(true)}
      >
        Add Expense
      </Button>
      <Modal
        open={openAddExpenseModal}
        onClose={(): void => setOpenAddExpenseModal(false)}
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
              <PaidIcon />
            </Avatar>
            <Box sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                autoFocus
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="vendor"
                label="Vendor"
                name="vendor"
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <LoadingButton
                loading={loading}
                onClick={handleSubmit}
                text={'Add Expense'}
              />
            </Box>
          </Box>
        </Container>
      </Modal>
    </GridToolbarContainer>
  );
};

export default ExpensesDataGridToolBar;
