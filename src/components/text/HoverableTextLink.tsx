import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './HoverableTextLink.module.scss';

interface HoverableTextLinkProps {
  text: string;
  onClick: () => void;
  sx?: any;
}

const HoverableTextLink: React.FC<HoverableTextLinkProps> = (
  props: HoverableTextLinkProps,
): React.ReactElement => {
  return (
    <Typography
      className={styles.HoverableTextLink}
      onClick={props.onClick}
      sx={props.sx}
    >
      {props.text}
    </Typography>
  );
};

export default HoverableTextLink;
