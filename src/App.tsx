import Home from "./Home";
import Event from "./Event";
import Match from "./Match";
import MatchSet from "./MatchSet";
import MatchSetGame from "./MatchSetGame";
import { useAppQueryParams } from "./utils";
import MainAppV2 from "./version-2/MainAppV2";

function App() {
  const [queryParams] = useAppQueryParams();

  if (queryParams.version === 2) {
    return <MainAppV2 />;
  }

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
