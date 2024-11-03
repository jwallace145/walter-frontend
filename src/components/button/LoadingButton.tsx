import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';

export interface LoadingButtonProps {
  loading: boolean;
  onClick: (event: React.FormEvent) => void;
  text: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        disabled={props.loading}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
      {props.loading && (
        <CircularProgress
          size={24}
          sx={{
            color: grey[400],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;
