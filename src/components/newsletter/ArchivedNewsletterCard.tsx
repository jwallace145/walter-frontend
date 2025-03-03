import React, { useState } from 'react';
import { getNewsletters, Newsletter } from '../../api/methods/GetNewsletters';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';
import { Modal, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';
import { GetNewsletterResponse } from '../../api/methods/GetNewsletter';
import Box from '@mui/material/Box';

interface ArchivedNewsletterCardProps {
  newsletter: Newsletter;
}

const ArchivedNewsletterCard: React.FC<ArchivedNewsletterCardProps> = (
  props: ArchivedNewsletterCardProps,
): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<string>('');
  const [openNewsletter, setOpenNewsletter] = useState<boolean>(false);

  const getNewsletter: () => void = (): void => {
    setLoading(true);
    WalterAPI.getNewsletter(props.newsletter.datestamp)
      .then((response: GetNewsletterResponse): void => {
        if (response.isSuccess()) {
          setNewsletter(response.getNewsletter());
          setOpenNewsletter(true);
        }
      })
      .catch((error: Error): any => console.log(error))
      .finally(() => setLoading(false));
  };

  const displayNewsletter: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              alignItems: 'center',
              padding: 2,
              borderRadius: '40px',
              backgroundColor: Colors.LIGHT_GRAY,
              outline: `1px solid ${Colors.GRAY}`,
              width: '70%',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: newsletter }} />
          </Box>
        </Grid>
      );
    };

  return (
    <>
      <Grid
        container
        size={12}
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
          padding: '3px',
          marginBottom: '15px',
        }}
      >
        <Grid size={6}>
          <Stack
            sx={{
              marginLeft: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '3px',
            }}
          >
            <Typography
              onClick={(): void => {}}
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'bold',
                fontSize: '24px',
                '&:hover': {
                  color: Colors.YELLOW,
                  textDecoration: 'underline',
                },
                transition: 'color 0.3s ease, text-decoration 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {props.newsletter.template}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              {props.newsletter.datestamp}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            loading={loading}
            onClick={(): void => getNewsletter()}
            text={'Get'}
            sx={{
              outline: `1px solid ${Colors.GRAY}`,
              backgroundColor: Colors.YELLOW,
              borderRadius: '40px',
              '&:hover': {
                backgroundColor: Colors.YELLOW_HOVER,
              },
              transition: 'background-color 0.3s ease',
              width: '25%',
              height: '35px',
              marginTop: '15px',
              marginRight: '15px',
            }}
          />
        </Grid>
        {openNewsletter && displayNewsletter()}
      </Grid>
    </>
  );
};

export default ArchivedNewsletterCard;
