import '@mantine/core/styles.css';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import Navbar from '@/components/Navbar/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Photo Browser App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/camera-favicon.ico" />
      </Head>
      <Navbar />
      <div className="content-wrapper">
        <Notifications />
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}
