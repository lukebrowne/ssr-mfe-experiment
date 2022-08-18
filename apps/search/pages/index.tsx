export default function Search() {
  return (
    <form>
      <label>
        Query
        <input name="query" type="text" />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
