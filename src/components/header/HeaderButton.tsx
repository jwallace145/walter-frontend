import React from 'react';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';

/**
 * HeaderButtonProps
 *
 * The props of a header button included in the AppBar.
 */
export interface HeaderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * HeaderButton
 *
 * The component for the header buttons in the AppBar used to navigate
 * throughout the site.
 *
 * @param props
 * @constructor
 */
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
