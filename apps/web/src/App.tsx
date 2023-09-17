import { useArticlesQuery } from "./queries/operations/get-articles.operation";
import { Button } from "shared-ui";

function App() {
  const { loading, data, error } = useArticlesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {JSON.stringify(data)}
      <Button className="222" onClick={console.log}>222</Button>
    </div>
  );
}

export default App;
