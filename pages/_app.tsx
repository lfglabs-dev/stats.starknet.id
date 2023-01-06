import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PropTypes from 'prop-types';
import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/layouts/Navbar';
import { MetricsProvider } from '../contexts/MetricsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App: FC<MyAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
  const queryClient = new QueryClient();

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <MetricsProvider>
          <Head>
            <title>Dashboard.Starknet.id</title>
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </ MetricsProvider>
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default App;
