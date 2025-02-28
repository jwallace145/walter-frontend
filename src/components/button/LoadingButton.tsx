import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import { Colors, Fonts } from '../../constants/Constants';

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
    <Box sx={{ position: 'relative', ...props.sx }}>
      <Button
        fullWidth
        disabled={props.loading}
        onClick={props.onClick}
        sx={{
          fontFamily: Fonts.RALEWAY,
          fontWeight: 'bold',
          color: Colors.BLACK,
          position: 'relative',
          visibility: props.loading ? 'hidden' : 'visible',
        }}
      >
        {props.text}
      </Button>
      {props.loading && (
        <CircularProgress
          size={24}
          thickness={5}
          sx={{
            color: Colors.BLACK_HOVER,
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;
