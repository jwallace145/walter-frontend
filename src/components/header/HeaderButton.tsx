import React, { FC, ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { LANDING_PAGE } from '../../pages/common/Pages';
import Typography from '@mui/material/Typography';

/**
 * HeaderButtonProps
 *
 * The props of a header button included in the AppBar.
 */
export interface HeaderButtonProps {
  title: string;
  onClick: () => void;
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
const HeaderButton: FC<HeaderButtonProps> = (props) => {
  return (
    <>
      <Typography
        sx={{
          color: 'black',
          fontFamily: 'Raleway',
          fontSize: '20px',
          fontWeight: 'bold',
          '&:hover': {
            color: '#FFD213',
            textDecoration: 'underline',
          },
          transition: 'color 0.3s ease, text-decoration 0.3s ease',
          cursor: 'pointer',
          marginLeft: '20px',
        }}
        onClick={props.onClick}
      >
        {props.title}
      </Typography>
    </>
  );
};

export default HeaderButton;
