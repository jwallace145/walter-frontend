import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Colors, Fonts } from '../../constants/Constants';

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
          color: Colors.BLACK,
          fontFamily: Fonts.RALEWAY,
          fontSize: '20px',
          fontWeight: 'bold',
          '&:hover': {
            color: Colors.YELLOW,
            textDecoration: 'underline',
          },
          transition: 'color 0.3s ease, text-decoration 0.3s ease',
          cursor: 'pointer',
          marginLeft: '30px',
        }}
        onClick={props.onClick}
      >
        {props.title}
      </Typography>
    </>
  );
};

export default HeaderButton;
