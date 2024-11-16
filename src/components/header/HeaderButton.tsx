import { FC, ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';

/**
 * HeaderButtonProps
 *
 * The props of a header button included in the AppBar.
 */
export interface HeaderButtonProps {
  title: string;
  onClick: () => void;
  children: ReactNode;
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
      <Tooltip title={props.title}>
        <IconButton
          sx={{
            bgcolor: grey[500],
            cursor: 'pointer',
            '&:hover': {
              bgcolor: grey[200],
            },
          }}
          onClick={props.onClick}
        >
          {props.children}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default HeaderButton;
