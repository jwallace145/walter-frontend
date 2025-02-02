import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { WalterAPI } from '../api/WalterAPI';
import { GetStockResponse, Stock } from '../api/methods/GetStock';
import StockOverview from '../components/stock/StockOverview';
import { GetNewsSummaryResponse } from '../api/methods/GetNewsSummary';
import StockNewsSummary from '../components/stock/StockNewsSummary';
import { GetPricesResponse, Price } from '../api/methods/GetPrices';

const StockDashboardPage: React.FC = (props) => {
  const params: Readonly<Params> = useParams();
  const [stockLoading, setStockLoading] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [stock, setStock] = useState<Stock>();
  const [prices, setPrices] = useState<Price[]>([]);
  const [summary, setSummary] = useState<string>();

  useEffect(() => {
    getStockOverview();
    getStockPrices();
    getStockNewsSummary();
  }, []);

  const getStockOverview = () => {
    setStockLoading(true);
    WalterAPI.getStock(params.symbol as string)
      .then((response: GetStockResponse) => {
        setStock(response.getStock());
      })
      .finally(() => {
        setStockLoading(false);
      });
  };

  const getStockPrices = () => {
    setPricesLoading(true);
    WalterAPI.getPrices(params.symbol as string)
      .then((response: GetPricesResponse) => {
        setPrices(response.getPrices());
      })
      .finally(() => {
        setPricesLoading(false);
      });
  };

  const getStockNewsSummary = () => {
    setSummaryLoading(true);
    WalterAPI.getNewsSummary(params.symbol as string)
      .then((response: GetNewsSummaryResponse) => {
        setSummary(response.getSummary());
      })
      .finally(() => {
        setSummaryLoading(false);
      });
  };

  return (
    <>
      <StockOverview loading={stockLoading} stock={stock} />
      <StockNewsSummary loading={summaryLoading} summary={summary} />
    </>
  );
};

export default StockDashboardPage;
