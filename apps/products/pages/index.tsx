import queryString from 'query-string';
import { useEffect, useState } from 'react';

export default function Products({ params }) {
  const query = queryString.parse(params).query as string;
  const [rate, setRate] = useState(1.7);

  useEffect(() => {
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
