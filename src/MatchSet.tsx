import React from "react";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from "use-query-params";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/index";
import { eventSlice } from "./store/eventSlice";

const MatchSet: React.FC = () => {
  const [query] = useQueryParams({
    page: StringParam,
    event_slug: StringParam,
    match: withDefault(NumberParam, -1),
    match_set: withDefault(NumberParam, -1),
    match_set_game: withDefault(NumberParam, -1),
  });

  const event = useSelector((state: RootState) =>
    query.event_slug ? state.events[query.event_slug] : undefined
  );
  const matchIndex = query.match;
  const setIndex = query.match_set;
  const match =
    event && typeof matchIndex === "number"
      ? event.matches[matchIndex]
      : undefined;
  const set =
    match && typeof setIndex === "number" ? match.sets[setIndex] : undefined;

  const dispatch = useDispatch();
  const { addEvent } = eventSlice.actions;
  if (!event || !match || !set) {
    return <div className="text-red-500">Set not found.</div>;
  }
  // Find the current set's index for new game
  const setGameCount = set.length;

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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        onClick={() => {
          // Add a new Game (array of 'team_1' or 'team_2') to the set
          const updatedMatches = event.matches.map((m, idx) => {
            if (idx === matchIndex) {
              const updatedSets = m.sets.map((s, sIdx) =>
                sIdx === setIndex ? [...s, []] : s
              );
              return { ...m, sets: updatedSets };
            }
            return m;
          });
          dispatch(addEvent({ ...event, matches: updatedMatches }));
          window.history.replaceState(
            null,
            "",
            `?page=set_game&event_slug=${query.event_slug}&match=${matchIndex}&match_set=${setIndex}&match_set_game=${setGameCount}`
          );
        }}
      >
        Start New Game
      </button>
    </div>
  );
};

export default MatchSet;
