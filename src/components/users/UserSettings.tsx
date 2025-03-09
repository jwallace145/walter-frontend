import React from 'react';
import { User } from '../../api/methods/GetUser';
import UserSubscriptionStatus from './UserSubscriptionStatus';
import UserVerificationStatus from './UserVerificationStatus';
import UserInformation from './UserInformation';

interface UserDetailsCardProps {
  user: User;
  setRefresh: (refresh: boolean) => void;
}

const UserSettings: React.FC<UserDetailsCardProps> = (
  props: UserDetailsCardProps,
): React.ReactElement => {
  return (
    <>
      <UserInformation user={props.user} />
      <UserVerificationStatus
        verified={props.user.verified}
        setRefresh={props.setRefresh}
      />
      <UserSubscriptionStatus
        subscribed={props.user.subscribed}
        setRefresh={props.setRefresh}
      />
    </>
  );
};

export default UserSettings;
