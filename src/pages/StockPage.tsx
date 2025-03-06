import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { WalterAPI } from '../api/WalterAPI';
import { GetStockResponse, Stock } from '../api/methods/GetStock';
import StockOverview from '../components/stock/StockOverview';
import {
  GetNewsSummaryResponse,
  NewsSource,
} from '../api/methods/GetNewsSummary';
import StockNewsSummary from '../components/stock/StockNewsSummary';
import { GetPricesResponse, Price } from '../api/methods/GetPrices';
import StockLineGraph from '../components/stock/StockLineGraph';
import StockNewsSource from '../components/stock/StockNewsSource';
import Grid from '@mui/material/Grid2';
import { Stack } from '@mui/material';
import HomePage from './common/HomePage';
import SideBar from '../components/sidebar/SideBar';
import { StockStatistics } from '../api/methods/GetStatistics';
import { GetStatisticsResponse } from '../api/methods/GetStatistics';
import StockStatisticsCard from '../components/stock/StockStatisticsCard';

interface StockPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const StockPage: React.FC<StockPageProps> = (
  props: StockPageProps,
): React.ReactElement => {
  const params: Readonly<Params> = useParams();
  const [stockLoading, setStockLoading] = useState(false);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [stock, setStock] = useState<Stock>();
  const [statistics, setStatistics] = useState<StockStatistics>();
  const [prices, setPrices] = useState<Price[]>([]);
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [summary, setSummary] = useState<string>();

  useEffect((): void => {
    getStockOverview();
    getStockStatistics();
    getStockPrices();
    getStockNewsSummary();
  }, []);

  const getStockOverview = () => {
    setStockLoading(true);
    WalterAPI.getStock(params.symbol as string)
      .then((response: GetStockResponse) => {
        setStock(response.getStock());
      })
      .finally((): void => {
        setStockLoading(false);
      });
  };

  const getStockStatistics: () => void = (): void => {
    setStatisticsLoading(true);
    WalterAPI.getStatistics(params.symbol as string)
      .then((response: GetStatisticsResponse): void => {
        setStatistics(response.getStatistics() as StockStatistics);
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setStatisticsLoading(false);
      });
  };

  const getStockPrices = () => {
    setPricesLoading(true);
    WalterAPI.getPrices(params.symbol as string)
      .then((response: GetPricesResponse) => {
        setPrices(response.getPrices());
      })
      .finally((): void => {
        setPricesLoading(false);
      });
  };

  const getStockNewsSummary = () => {
    setSummaryLoading(true);
    WalterAPI.getNewsSummary(params.symbol as string)
      .then((response: GetNewsSummaryResponse) => {
        setSummary(response.getSummary());
        setSources(response.getSources());
      })
      .finally((): void => {
        setSummaryLoading(false);
      });
  };

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar setAuthenticated={props.setAuthenticated} currentTab={''} />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container>
        <Grid size={6}>
          <Stack>
            <StockOverview loading={stockLoading} stock={stock} />
            <StockStatisticsCard
              loading={statisticsLoading}
              statistics={statistics}
            />
            <StockLineGraph
              loading={pricesLoading && stockLoading}
              stock={stock}
              prices={prices}
            />
            <StockNewsSource loading={summaryLoading} sources={sources} />
          </Stack>
        </Grid>
        <Grid size={6}>
          <StockNewsSummary
            loading={summaryLoading}
            summary={summary}
            sx={{ marginLeft: '10px' }}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <HomePage
      sideBar={getSideBar()}
      content={getContent()}
      authenticated={true}
    />
  );
};

export default StockPage;
