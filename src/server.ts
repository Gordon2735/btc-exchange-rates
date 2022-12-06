import express, { Application, Request, Response, NextFunction } from 'express';
import path, { PlatformPath } from 'path';
import axios, { AxiosResponse } from 'axios';
import morgan from 'morgan';
import NodeCache from 'node-cache';
import { format } from 'date-fns';
import open from 'open';
import { Server } from 'node:http';
import favicon from 'serve-favicon';

const appCache = new NodeCache();

const app: Application = express();

const paths: PlatformPath = path;

app.use(morgan('dev'));

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  }
);

app.use(morganMiddleware);

// app.use(express.static(paths.join(__dirname, '..', 'public')));

app.set('view engine', 'pug');
app.set('./views', paths.join(__dirname, '..', 'views'));
app.use(favicon(__dirname + '/images/favicon.ico'));

type Currency = {
  name: string;
  unit: string;
  value: number;
  type: string;
};

type Rates = {
  rates: Record<string, Currency>;
};

type ExchangeRateResult = {
  timestamp: Date;
  exchangeRates: Rates;
};

async function getExchangeRates() {
  const response: AxiosResponse = await axios.get(
    'https://api.coingecko.com/api/v3/exchange_rates',
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  return response.data;
}

async function refreshExchangeRates(): Promise<ExchangeRateResult> {
  const rates = await getExchangeRates();
  const result = {
    timestamp: new Date(),
    exchangeRates: rates,
  };

  appCache.set('exchangeRates', result, 600);

  console.log('Exchange rates cache updated');
  return result;
}

appCache.on('expired', async (key) => {
  try {
    if (key === 'exchangeRates') {
      await refreshExchangeRates();
    }
  } catch (err) {
    console.error(err);
  }
});

app.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    let data: ExchangeRateResult | undefined = appCache.get('exchangeRates');

    if (data === undefined) {
      data = await refreshExchangeRates();
    }

    res.render('home', {
      title: 'Bitcoin Exchange Rates',
      lastUpdated: format(data.timestamp, 'LLL dd, yyyy hh:mm:ss a O'),
      data,
    });
  } catch (err) {
    console.error(err);
    res.set('Content-Type', 'text/html');
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
  _next();
});

const PORT: string | 3000 = process.env.PORT || 3000;
const HOST: string = process.env.HOST || '127.0.0.01';
const server: Server = app.listen(PORT, async () => {
  server;
  console.log(`server started on host: ${HOST} & port: ${PORT}`);

  try {
    await refreshExchangeRates();
  } catch (error: unknown) {
    console.error('Unable to refresh exchange rate due to error: ', error);
  }
});

async function openChrome(host: string, port: string | 3000): Promise<void> {
  await open(`${host}:${port}`, {
    app: { name: open.apps.chrome },
  }).catch((error: Error): void => {
    console.error(error);
  });
}
openChrome(HOST, PORT);
