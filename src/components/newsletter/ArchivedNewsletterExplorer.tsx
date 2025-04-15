import React, { useEffect, useState } from 'react';
import {
  GetNewslettersResponse,
  Newsletter,
} from '../../api/methods/GetNewsletters';
import Grid from '@mui/material/Grid2';
import ArchivedNewsletterCard from './ArchivedNewsletterCard';
import styles from './ArchivedNewsletterExplorer.module.scss';
import Typography from '@mui/material/Typography';
import { WalterAPI } from '../../api/WalterAPI';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { Container, Pagination } from '@mui/material';

const ArchivedNewsletterExplorer: React.FC = (): React.ReactElement => {
  const [currentNewsletterHtml, setCurrentNewsletterHtml] = React.useState<
    string | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(-1);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect((): void => {
    getNewsletters(page);
  }, []);

  const getNewsletters: (page: number) => void = (page: number): void => {
    setLoading(true);
    WalterAPI.getNewsletters(page)
      .then((response: GetNewslettersResponse): void => {
        if (response.isSuccess()) {
          setPage(response.getCurrentPage());
          setLastPage(response.getLastPage());
          setNewsletters(response.getNewsletters());
        }
      })
      .catch((error: Error): any => console.log(error))
      .finally((): any => setLoading(false));
  };

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

  const handleChangePage = (event: any, newPage: any): void => {
    if (newPage !== page && newPage > 0 && newPage <= lastPage) {
      getNewsletters(newPage);
    }
  };

  if (loading) {
    return <LoadingCircularProgress />;
  }

  return (
    <Grid container size={11} spacing={2}>
      <Grid size={5} sx={{ alignItems: 'center' }}>
        {newsletters.map(
          (newsletter: Newsletter): React.ReactElement => (
            <ArchivedNewsletterCard
              newsletter={newsletter}
              setCurrentNewsletterHtml={setCurrentNewsletterHtml}
            />
          ),
        )}
        <Container className={styles.ArchivedNewsletterExplorer__pagination}>
          <Pagination
            page={page}
            count={lastPage}
            onChange={handleChangePage}
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'Raleway',
                fontSize: '1.2rem',
              },
            }}
          />
        </Container>
      </Grid>
      <Grid size={7} className={styles.ArchivedNewsletterExplorer__container}>
        {viewNewsletter(currentNewsletterHtml)}
      </Grid>
    </Grid>
  );
};

export default ArchivedNewsletterExplorer;
