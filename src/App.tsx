import { StringParam, useQueryParams, withDefault } from "use-query-params";
import Home from "./Home";
import Event from "./Event";
import Match from "./Match";
import MatchSet from "./MatchSet";
import MatchSetGame from "./MatchSetGame";

function App() {
  const [queryParams] = useQueryParams({
    page: withDefault(StringParam, "home"),
  });

  if (queryParams.page === "home") {
    return <Home />;
  }

  if (queryParams.page === "event") {
    return <Event />;
  }

  if (queryParams.page === "match") {
    return <Match />;
  }

  if (queryParams.page === "match_set") {
    return <MatchSet />;
  }

  if (queryParams.page === "set_game") {
    return <MatchSetGame />;
  }
  return null;
}

export default App;
