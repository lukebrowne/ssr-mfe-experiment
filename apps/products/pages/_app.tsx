import { AppProps } from 'next/app';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <section className="app">
      <Component {...pageProps} />
    </section>
  );
}

export default CustomApp;
