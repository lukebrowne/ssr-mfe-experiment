import queryString from 'query-string';

export default function Products({ params }) {
  const query = queryString.parse(params).query as string;

  const products = ["Harold's Merlot", 'Savvy B'];
  return (
    <ul>
      {products
        .filter(
          (product) =>
            !query ||
            product.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
        )
        .map((product, index) => (
          <li key={index}>{product}</li>
        ))}
    </ul>
  );
}

Products.getInitialProps = ({ req }) => {
  const { query: params } = queryString.parseUrl(req.headers['x-request-uri']);

  return { params: queryString.stringify(params) };
};
