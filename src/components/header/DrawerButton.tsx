import React, { FC } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export interface DrawerButtonProps {
  onClick: () => void;
  buttonName: string;
}

const DrawerButton: FC<DrawerButtonProps> = (props) => {
  return (
    <>
      <ListItem key={'Portfolio'} disablePadding>
        <ListItemButton onClick={props.onClick}>
          <ListItemText primary={props.buttonName} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default DrawerButton;
