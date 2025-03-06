import React from 'react';
import { Colors } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';

const UserSubscriptionStatusCard: React.FC = (): React.ReactElement => {
  return (
    <Grid
      container
      sx={{
        borderRadius: '40px',
        backgroundColor: Colors.LIGHT_GRAY,
        outline: '1px solid ' + Colors.GRAY,
        padding: '3px',
        marginBottom: '15px',
      }}
    >
      User Subscription Status
    </Grid>
  );
};

export default UserSubscriptionStatusCard;
