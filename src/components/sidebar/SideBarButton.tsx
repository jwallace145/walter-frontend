import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Colors, Fonts } from '../../constants/Constants';

interface SideBarButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  bold: boolean;
  sx?: object;
}

const SideBarButton: React.FC<SideBarButtonProps> = (
  props: SideBarButtonProps,
): React.ReactElement => {
  return (
    <Container
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        marginTop: '30px',
        ...props.sx,
      }}
    >
      {props.icon}
      <Typography
        onClick={props.onClick}
        sx={{
          color: Colors.BLACK,
          fontFamily: Fonts.RALEWAY,
          fontSize: '20px',
          fontWeight: props.bold ? 'bold' : 'normal',
          '&:hover': {
            color: Colors.YELLOW,
            textDecoration: 'underline',
          },
          transition: 'color 0.3s ease, text-decoration 0.3s ease',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        {props.title}
      </Typography>
    </Container>
  );
};

export default SideBarButton;
