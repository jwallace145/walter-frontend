import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';

export interface LoadingButtonProps {
  sx?: object;
  loading: boolean;
  onClick: (event: React.FormEvent) => void;
  text: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = (
  props: LoadingButtonProps,
) => {
  return (
    <Box sx={{ m: 1, position: 'relative', ...props.sx }}>
      <Button
        fullWidth
        disabled={props.loading}
        onClick={props.onClick}
        sx={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 'bold',
          color: 'black',
          visibility: props.loading ? 'hidden' : 'visible',
        }}
      >
        {props.text}
      </Button>
      {props.loading && (
        <CircularProgress
          size={18}
          sx={{
            color: grey[400],
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            visibility: 'visible',
          }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;
