import queryString from 'query-string';
import { useEffect, useState } from 'react';

export default function Products({ params }) {
  const query = queryString.parse(params).query as string;
  const [rate, setRate] = useState(1.7);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    setShowError(false);
    const handle = setInterval(() => {
      const newRate = 1.7 + Math.random() * 0.5;
      setRate(newRate);
    }, 100);

    return () => clearInterval(handle);
  }, []);

  const products = [
    { name: "Harold's Merlot", price: 12.99 },
    { name: 'Savvy B', price: 9.99 },
  ];
  return (
    <>
      {showError && (
        <>
          <p className="blink" style={{ fontSize: '30px', color: '#FF0000' }}>
            THIS INFORMATION IS OUT OF DATE
          </p>{' '}
          <img
            className="spin"
            src="https://i2-prod.manchestereveningnews.co.uk/incoming/article14444584.ece/ALTERNATES/s615b/409.png"
            alt="poor Harold :( taking a big L"
          />
        </>
      )}
      <p>The current GBP:ASD exchange rate is {rate}</p>
      <ul>
        {products
          .filter(
            (product) =>
              !query ||
              product.name
                .toLocaleLowerCase()
                .startsWith(query.toLocaleLowerCase())
          )
          .map((product, index) => (
            <li key={index}>
              {product.name} - {(product.price / rate).toFixed(2)} GBP
              <form method="POST" action="http://localhost:3000?index">
                <input hidden name="productId" value={product.name} readOnly />
                <button type="submit">Add to Cart</button>
              </form>
            </li>
          ))}
      </ul>
    </>
  );
}

Products.getInitialProps = ({ req }) => {
  const { query: params } = queryString.parseUrl(req.headers['x-request-uri']);

  return { params: queryString.stringify(params) };
};
