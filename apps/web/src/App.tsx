import { useArticlesQuery } from "./queries/operations/get-articles.operation";

function App() {
  const { loading, data, error } = useArticlesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
