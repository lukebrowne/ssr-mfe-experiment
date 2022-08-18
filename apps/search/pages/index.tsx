import queryString from 'query-string';

export default function Search({ params }) {
  const query = queryString.parse(params).query as string;

  return (
    <form>
      <label>
        Query
        <input name="query" type="text" defaultValue={query} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

Search.getInitialProps = ({ req }) => {
  const { query: params } = queryString.parseUrl(req.headers['x-request-uri']);

  return { params: queryString.stringify(params) };
};
