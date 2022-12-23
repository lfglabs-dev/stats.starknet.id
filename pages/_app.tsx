import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/layouts/Navbar';
import { MetricsProvider } from '../contexts/MetricsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MetricsProvider>
        <Head>
          <title>Dashboard.Starknet.id</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </ MetricsProvider>
    </QueryClientProvider>
  )
}

export default App;
