import queryString from 'query-string';

const formatter = new Intl.NumberFormat('en-GB', { currency: 'gbp' });

export default function Products({ params }) {
  const query = queryString.parse(params).query as string;

  const products = [
    { name: "Harold's Merlot", price: 12.99 },
    { name: 'Savvy B', price: 9.99 },
  ];
  return (
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
            {product.name} - {formatter.format(product.price)}
            <form method="POST" action="http://localhost:3000?index">
              <input hidden name="productId" value={product.name} readOnly />
              <button type="submit">Add to Cart</button>
            </form>
          </li>
        ))}
    </ul>
  );
}

Products.getInitialProps = ({ req }) => {
  const { query: params } = queryString.parseUrl(req.headers['x-request-uri']);

  return { params: queryString.stringify(params) };
};
