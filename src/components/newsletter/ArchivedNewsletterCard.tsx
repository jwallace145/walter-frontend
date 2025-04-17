import React from 'react';
import { Newsletter } from '../../api/methods/GetNewsletters';
import { Colors } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';
import { Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '../button/LoadingButton';
import styles from './ArchivedNewsletterCard.module.scss';
import { WalterAPI } from '../../api/WalterAPI';
import { GetNewsletterResponse } from '../../api/methods/GetNewsletter';

interface ArchivedNewsletterCardProps {
  newsletter: Newsletter;
  setCurrentNewsletterHtml: (newsletterHtml: string) => void;
}

const ArchivedNewsletterCard: React.FC<ArchivedNewsletterCardProps> = (
  props: ArchivedNewsletterCardProps,
): React.ReactElement => {
  const [loading, setLoading] = React.useState(false);

  const getNewsletter: () => void = (): void => {
    if (props.newsletter === null) {
      return;
    }

    setLoading(true);
    WalterAPI.getNewsletter(props.newsletter.date)
      .then((response: GetNewsletterResponse): void => {
        if (response.isSuccess()) {
          props.setCurrentNewsletterHtml(response.getNewsletter());
        } else {
          console.log(response.getMessage());
        }
      })
      .catch((error: Error): any => console.log(error))
      .finally((): void => {
        setLoading(false);
      });
  };
  return (
    <>
      <Grid
        container
        size={12}
        className={styles.ArchivedNewsletterCard__container}
      >
        <Grid size={12}>
          <Typography
            onClick={(): void => {}}
            className={styles.ArchivedNewsletterCard__title}
          >
            {props.newsletter.title}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Stack>
            <Typography className={styles.ArchivedNewsletterCard__text__bold}>
              Model:{' '}
              <Typography
                className={styles.ArchivedNewsletterCard__text}
                sx={{ display: 'inline' }}
              >
                {props.newsletter.model}
              </Typography>
            </Typography>
            <Typography className={styles.ArchivedNewsletterCard__text__bold}>
              Date:{' '}
              <Typography
                className={styles.ArchivedNewsletterCard__text}
                sx={{ display: 'inline' }}
              >
                {props.newsletter.date}
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            loading={loading}
            onClick={getNewsletter}
            text={'View'}
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
      </Grid>
    </>
  );
};

export default ArchivedNewsletterCard;
