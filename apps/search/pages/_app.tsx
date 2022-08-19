import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <section style={{ border: '5px solid #2B9EB3', padding: '20px' }}>
      <Component {...pageProps} />
    </section>
  );
}

export default CustomApp;
