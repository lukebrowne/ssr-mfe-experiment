import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <section>
      <Component {...pageProps} />
    </section>
  );
}

export default CustomApp;
