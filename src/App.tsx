
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import Home from './Home';
import Event from './Event';

function App() {
  const [queryParams] = useQueryParams({
    page: withDefault(StringParam, 'home')
  });

  if (queryParams.page === 'home') {
    return <Home />;
  }

  if (queryParams.page === 'event') {
    return <Event />;
  }

  return null;
}

export default App
