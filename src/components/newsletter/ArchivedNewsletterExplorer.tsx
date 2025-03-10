import React, { useEffect, useState } from 'react';
import {
  GetNewslettersResponse,
  Newsletter,
} from '../../api/methods/GetNewsletters';
import Grid from '@mui/material/Grid2';
import ArchivedNewsletterCard from './ArchivedNewsletterCard';
import styles from './ArchivedNewsletterExplorer.module.scss';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Colors } from '../../constants/Constants';
import { WalterAPI } from '../../api/WalterAPI';
import { GetNewsletterResponse } from '../../api/methods/GetNewsletter';

interface ArchivedNewsletterExplorerProps {
  newsletters: Newsletter[];
}

const ArchivedNewsletterExplorer: React.FC<ArchivedNewsletterExplorerProps> = (
  props: ArchivedNewsletterExplorerProps,
): React.ReactElement => {
  const [currentNewsletterHtml, setCurrentNewsletterHtml] = React.useState<
    string | null
  >(null);

  const viewNewsletter: (
    newsletterHtml: string | null,
  ) => React.ReactElement = (
    newsletterHtml: string | null,
  ): React.ReactElement => {
    // early return if no newsletter currently selected
    if (newsletterHtml === null) {
      return (
        <Typography className={styles.ArchivedNewsletterExplorer__title}>
          No newsletter selected...
        </Typography>
      );
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: `${newsletterHtml as string}` }}
      />
    );
  };

  return (
    <Grid container size={11} spacing={2}>
      <Grid size={5}>
        {props.newsletters.map(
          (newsletter: Newsletter): React.ReactElement => (
            <ArchivedNewsletterCard
              newsletter={newsletter}
              setCurrentNewsletterHtml={setCurrentNewsletterHtml}
            />
          ),
        )}
      </Grid>
      <Grid size={7} className={styles.ArchivedNewsletterExplorer__container}>
        {viewNewsletter(currentNewsletterHtml)}
      </Grid>
    </Grid>
  );
};

export default ArchivedNewsletterExplorer;
