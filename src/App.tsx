
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import Home from './Home';

function App() {
  const [queryParams] = useQueryParams({
    page: withDefault(StringParam, 'home')
  });

  console.log(queryParams.page)

  if (queryParams.page === 'home') {
    return <Home />;
  }

  return null;
}

export default App
