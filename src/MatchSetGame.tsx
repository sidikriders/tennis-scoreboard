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

const tennisScore = [0, 15, 30, 40, "Adv", "Win"];

const MatchSetGame: React.FC = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    page: StringParam,
    event_slug: StringParam,
    match: withDefault(NumberParam, -1),
    match_set: withDefault(NumberParam, -1),
    match_set_game: withDefault(NumberParam, -1),
  });
  const dispatch = useDispatch();
  const { addEvent } = eventSlice.actions;

  const event = useSelector((state: RootState) =>
    queryParams.event_slug ? state.events[queryParams.event_slug] : undefined
  );
  const matchIndex = queryParams.match;
  const setIndex = queryParams.match_set;
  const gameIndex = queryParams.match_set_game;
  const match =
    event && typeof matchIndex === "number"
      ? event.matches[matchIndex]
      : undefined;
  const set =
    match && typeof setIndex === "number" ? match.sets[setIndex] : undefined;
  const game =
    set && typeof gameIndex === "number" ? set[gameIndex] : undefined;

  if (!event || !match || !set || !game) {
    return <div className="text-red-500">Game not found.</div>;
  }

  // Calculate score for each team
  const team1Points = game.filter((p) => p === "team_1").length;
  const team2Points = game.filter((p) => p === "team_2").length;

  // Tennis scoring logic (simplified, not handling deuce/adv/win fully)
  const getScore = (points: number, other: number) => {
    if (points < 4) return tennisScore[points];
    if (points === other) return 40;
    if (points === other + 1) return "Adv";
    if (points > other + 1) return "Win";
    return tennisScore[3];
  };

  function addPoint(teamName: "team_1" | "team_2") {
    if (!event || !match || !set || !game) return;
    const updatedMatches = event.matches.map((m, idx) => {
      if (idx === matchIndex) {
        const updatedSets = [...m.sets];
        const updatedGames = [...updatedSets[setIndex]];
        updatedGames[gameIndex] = [...updatedGames[gameIndex], teamName];
        updatedSets[setIndex] = updatedGames;
        return { ...m, sets: updatedSets };
      }
      return m;
    });
    dispatch(addEvent({ ...event, matches: updatedMatches }));
  }

  function undoLastPoint() {
    if (!event || !match || !set || !game) return;
    const updatedMatches = event.matches.map((m, idx) => {
      if (idx === matchIndex) {
        const updatedSets = [...m.sets];
        const updatedGames = [...updatedSets[setIndex]];
        updatedGames[gameIndex] = updatedGames[gameIndex].slice(0, -1);
        updatedSets[setIndex] = updatedGames;
        return { ...m, sets: updatedSets };
      }
      return m;
    });
    dispatch(addEvent({ ...event, matches: updatedMatches }));
  }

  const isWin =
    getScore(team1Points, team2Points) === "Win" ||
    getScore(team2Points, team1Points) === "Win";

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-2">{event.event_name}</h1>
      <div className="mb-2 text-lg font-semibold">
        Match {typeof matchIndex === "number" ? matchIndex + 1 : ""} | Set{" "}
        {typeof setIndex === "number" ? setIndex + 1 : ""} | Game{" "}
        {typeof gameIndex === "number" ? gameIndex + 1 : ""}
      </div>
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
      <div className="flex gap-8 mb-6">
        <div className="text-xl font-bold">
          Team 1 Score: {getScore(team1Points, team2Points)}
        </div>
        <div className="text-xl font-bold">
          Team 2 Score: {getScore(team2Points, team1Points)}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => addPoint("team_1")}
        >
          Add Point Team 1
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={undoLastPoint}
          disabled={game.length === 0}
        >
          Undo Last Point
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => addPoint("team_2")}
        >
          Add Point Team 2
        </button>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() =>
            setQueryParams({
              match_set_game: undefined,
              page: "match_set",
            })
          }
          disabled={!isWin}
        >
          Back to Set ({typeof setIndex === "number" ? setIndex + 1 : ""}) Page
        </button>
      </div>
    </div>
  );
};

export default MatchSetGame;
