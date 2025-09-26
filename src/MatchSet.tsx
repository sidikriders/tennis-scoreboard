import React from "react";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from "use-query-params";
import { useSelector } from "react-redux";
import type { RootState } from "./store/index";

const MatchSet: React.FC = () => {
  const [query] = useQueryParams({
    event_slug: StringParam,
    match: withDefault(NumberParam, -1),
    set_match: withDefault(NumberParam, -1),
  });

  const event = useSelector((state: RootState) =>
    query.event_slug ? state.events[query.event_slug] : undefined
  );
  const matchIndex = query.match;
  const setIndex = query.set_match;
  const match =
    event && typeof matchIndex === "number"
      ? event.matches[matchIndex]
      : undefined;
  const set =
    match && typeof setIndex === "number" ? match.sets[setIndex] : undefined;

  if (!event || !match || !set) {
    return <div className="text-red-500">Set not found.</div>;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-2">{event.event_name}</h1>
      <div className="w-full max-w-xl mb-6">
        <h2 className="text-lg font-semibold mb-2">Team 1</h2>
        <div className="flex gap-2 mb-2">
          <span className="border px-2 py-1 rounded w-full bg-gray-100 flex items-center">
            {match.team_1.player_1 && match.team_1.player_2
              ? `${match.team_1.player_1} & ${match.team_1.player_2}`
              : match.team_1.player_1 || match.team_1.player_2}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2">Team 2</h2>
        <div className="flex gap-2 mb-2">
          <span className="border px-2 py-1 rounded w-full bg-gray-100 flex items-center">
            {match.team_2.player_1 && match.team_2.player_2
              ? `${match.team_2.player_1} & ${match.team_2.player_2}`
              : match.team_2.player_1 || match.team_2.player_2}
          </span>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-1">
        Match {typeof matchIndex === "number" ? matchIndex + 1 : ""}{" "}
        &nbsp;|&nbsp; Set {typeof setIndex === "number" ? setIndex + 1 : ""}
      </h2>
    </div>
  );
};

export default MatchSet;
