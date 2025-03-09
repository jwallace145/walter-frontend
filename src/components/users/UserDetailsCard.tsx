import React from 'react';
import { User } from '../../api/methods/GetUser';
import UserSubscriptionStatus from './UserSubscriptionStatus';
import UserVerificationStatus from './UserVerificationStatus';
import UserInformation from './UserInformation';

interface UserDetailsCardProps {
  user: User;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = (
  props: UserDetailsCardProps,
): React.ReactElement => {
  return (
    <>
      <UserInformation user={props.user} />
      <UserVerificationStatus verified={props.user.verified} />
      <UserSubscriptionStatus subscribed={props.user.subscribed} />
    </>
  );
};

export default UserDetailsCard;
