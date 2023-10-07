import { useArticlesQuery } from './queries/operations/get-articles.operation';
import { Select, Hello } from 'react-components';

function App() {
  const { loading, data, error } = useArticlesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className=" bg-yellow-50">
      {JSON.stringify(data)} <Select /> <Hello />
    </div>
  );
}

export default App;
