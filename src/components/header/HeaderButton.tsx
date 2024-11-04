import React from 'react';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface HeaderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  return (
    <>
      <Avatar
        sx={{
          bgcolor: grey[600],
          cursor: 'pointer',
          '&:hover': {
            bgcolor: grey[400],
          },
        }}
        onClick={props.onClick}
      >
        {props.children}
      </Avatar>
    </>
  );
};

export default HeaderButton;
