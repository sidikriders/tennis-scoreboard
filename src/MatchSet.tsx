import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/index";
import { eventSlice, type Game } from "./store/eventSlice";
import { useAppQueryParams } from "./utils";
import Breadcrumbs from "./Breadcrumbs";
import { getScore, getTeamScoreOnSet } from "./scoreUtils";

const MatchSet: React.FC = () => {
  const [queryParams, setQueryParams] = useAppQueryParams();

  const event = useSelector((state: RootState) =>
    queryParams.event_slug ? state.events[queryParams.event_slug] : undefined
  );
  const matchIndex = queryParams.match;
  const setIndex = queryParams.match_set;
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

  const scores = getTeamScoreOnSet(set);
  // Find the current set's index for new game
  const setGameCount = set.length;

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-2">{event.event_name}</h1>
      <h2 className="text-lg font-semibold mb-1">
        <Breadcrumbs />
      </h2>
      <div className="w-full max-w-xl mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Team 1{" "}
          <span className="ml-2 text-base font-normal">
            ({scores.team1Score})
          </span>
        </h2>
        <div className="flex gap-2 mb-2">
          <span className="border px-2 py-1 rounded w-full bg-gray-100 flex items-center">
            {match.team_1.player_1 && match.team_1.player_2
              ? `${match.team_1.player_1} & ${match.team_1.player_2}`
              : match.team_1.player_1 || match.team_1.player_2}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2">
          Team 2{" "}
          <span className="ml-2 text-base font-normal">
            ({scores.team2Score})
          </span>
        </h2>
        <div className="flex gap-2 mb-2">
          <span className="border px-2 py-1 rounded w-full bg-gray-100 flex items-center">
            {match.team_2.player_1 && match.team_2.player_2
              ? `${match.team_2.player_1} & ${match.team_2.player_2}`
              : match.team_2.player_1 || match.team_2.player_2}
          </span>
        </div>
      </div>
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
          setQueryParams({ match_set_game: setGameCount, page: "set_game" });
        }}
      >
        Start New Game
      </button>

      {/* list of the game from the current set */}
      <div className="w-full max-w-xl mb-6">
        {set.map((game, index) => (
          <GameLi points={game} gameIdx={index} key={index} />
        ))}
      </div>
    </div>
  );
};

const GameLi: React.FC<{
  gameIdx: number;
  points: Game;
}> = ({ gameIdx, points }) => {
  const [, setQueryParams] = useAppQueryParams();
  const rawScore = {
    team_1: points.filter((p) => p === "team_1").length,
    team_2: points.filter((p) => p === "team_2").length,
  };
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-1">
        Game {gameIdx + 1}{" "}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          onClick={() => {
            setQueryParams({
              page: "set_game",
              match_set_game: gameIdx,
            });
          }}
        >
          Go to Game
        </button>
      </h3>
      <div className="flex gap-2 mb-2">
        <span className="border px-2 py-1 rounded w-full bg-gray-100 flex items-center">
          {getScore(rawScore.team_1, rawScore.team_2)} -{" "}
          {getScore(rawScore.team_2, rawScore.team_1)}
        </span>
      </div>
    </div>
  );
};

export default MatchSet;
