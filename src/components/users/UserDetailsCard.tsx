import React from 'react';
import { Colors, Fonts, formatDate } from '../../constants/Constants';
import {
  Container,
  Link,
  Modal,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { User } from '../../api/methods/GetUser';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';
import { UnsubscribeResponse } from '../../api/methods/Unsubscribe';

const StyledGrid = styled(Grid)(({ theme }) => ({
  borderRadius: '40px',
  backgroundColor: Colors.LIGHT_GRAY,
  outline: '1px solid ' + Colors.GRAY,
  padding: '3px',
  marginBottom: '15px',
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  marginLeft: '20px',
  marginTop: '10px',
  marginBottom: '10px',
  padding: '3px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: Fonts.RALEWAY,
  fontSize: '18px',
  display: 'inline',
}));

const StyledTypographyLink = styled(Link)(({ theme }) => ({
  fontFamily: Fonts.RALEWAY,
  color: Colors.BLACK,
  fontSize: '18px',
  display: 'inline',
  textDecoration: 'none',
  '&:hover': {
    color: Colors.YELLOW,
    textDecoration: 'underline',
  },
  transition: 'color 0.3s ease, text-decoration 0.3s ease',
  cursor: 'pointer',
}));

interface UserDetailsCardProps {
  user: User;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = (
  props: UserDetailsCardProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
  const [unsubscribeLoading, setUnsubscribeLoading] = React.useState(false);
  const [openUnsubscribeModal, setOpenUnsubscribeModal] = React.useState(false);
  const [openSendVerificationEmailModal, setOpenSendVerificationEmailModal] =
    React.useState(false);

  const getSubscriptionStatus: () => React.ReactElement =
    (): React.ReactElement => {
      if (props.user.subscribed) {
        return (
          <StyledTypographyLink
            onClick={(): void => setOpenUnsubscribeModal(true)}
          >
            Subscribed
          </StyledTypographyLink>
        );
      } else {
        return (
          <StyledTypographyLink
            onClick={(): void => setOpenSubscribeModal(true)}
          >
            Not subscribed! Click here to subscribe
          </StyledTypographyLink>
        );
      }
    };

  const getVerificationStatus: () => React.ReactElement =
    (): React.ReactElement => {
      if (props.user.verified) {
        return <StyledTypography>Verified</StyledTypography>;
      } else {
        return (
          <StyledTypographyLink
            onClick={(): void => setOpenSendVerificationEmailModal(true)}
          >
            Not verified! Click here to verify
          </StyledTypographyLink>
        );
      }
    };

  const getUnsubscribeModal: () => React.ReactElement = () => {
    return (
      <Modal
        open={openUnsubscribeModal}
        onClose={(): void => setOpenUnsubscribeModal(false)}
      >
        <StyledGrid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
          }}
        >
          <StyledTypography sx={{ fontWeight: 'bold' }}>
            Unsubscribe?
          </StyledTypography>
          <LoadingButton
            loading={unsubscribeLoading}
            onClick={handleUnsubscribe}
            text={'Logout'}
            sx={{
              marginTop: '10px',
              backgroundColor: Colors.YELLOW,
              borderRadius: '40px',
              padding: '2px',
              '&:hover': {
                backgroundColor: Colors.YELLOW_HOVER,
              },
              transition: 'background-color 0.3s ease',
              width: '50%',
            }}
          />
        </StyledGrid>
      </Modal>
    );
  };

  const handleUnsubscribe: () => void = (): void => {
    setUnsubscribeLoading(true);
    WalterAPI.unsubscribe()
      .then((response: UnsubscribeResponse): void => {
        setOpenUnsubscribeModal(false);
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setUnsubscribeLoading(false);
      });
  };

  return (
    <>
      <StyledGrid container>
        <StyledStack>
          <StyledTypography>
            <StyledTypography sx={{ fontWeight: 'bold' }}>
              Email:{' '}
            </StyledTypography>
            {props.user.email}
          </StyledTypography>
          <StyledTypography>
            <StyledTypography sx={{ fontWeight: 'bold' }}>
              Username:{' '}
            </StyledTypography>
            {props.user.username}
          </StyledTypography>
          <StyledTypography>
            <StyledTypography sx={{ fontWeight: 'bold' }}>
              Sign Up Date:{' '}
            </StyledTypography>
            {formatDate(props.user.signUpDate, 'yyyy-mm-dd')}
          </StyledTypography>
          <StyledTypography>
            <StyledTypography sx={{ fontWeight: 'bold' }}>
              Subscription Status:{' '}
            </StyledTypography>
            {getSubscriptionStatus()}
          </StyledTypography>
          <StyledTypography>
            <StyledTypography sx={{ fontWeight: 'bold' }}>
              Verification Status:{' '}
            </StyledTypography>
            {getVerificationStatus()}
          </StyledTypography>
        </StyledStack>
      </StyledGrid>
      {openUnsubscribeModal && getUnsubscribeModal()}
      {openSendVerificationEmailModal && getUnsubscribeModal()}
    </>
  );
};

export default UserDetailsCard;
