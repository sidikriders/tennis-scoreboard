import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { eventSlice, type MatchSet } from "./store/eventSlice";
import type { RootState } from "./store/index";
import { useAppQueryParams } from "./utils";
import { getTeamsScoreOnMatch } from "./scoreUtils";

const Match: React.FC = () => {
  const [query, setQueryParams] = useAppQueryParams();

  const event = useSelector((state: RootState) =>
    query.event_slug ? state.events[query.event_slug] : undefined
  );
  const matchIndex = query.match;
  const match =
    event && typeof matchIndex === "number"
      ? event.matches[matchIndex]
      : undefined;
  const dispatch = useDispatch();
  const { addEvent } = eventSlice.actions;

  // Helper to update player name in Redux
  const updatePlayer = (
    team: "team_1" | "team_2",
    player: "player_1" | "player_2",
    value: string
  ) => {
    if (!event || typeof matchIndex !== "number") return;
    const updatedMatches = event.matches.map((m, idx) =>
      idx === matchIndex ? { ...m, [team]: { ...m[team], [player]: value } } : m
    );
    dispatch(addEvent({ ...event, matches: updatedMatches }));
  };

  if (!event || !match) {
    return <div className="text-red-500">Match not found.</div>;
  }

  const scores = getTeamsScoreOnMatch(match);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">
        Match {typeof matchIndex === "number" ? matchIndex + 1 : ""}
      </h1>
      <div
        className="text-gray-600 mb-2"
        onClick={() => setQueryParams({ match: undefined, page: "event" })}
      >
        Event: {event.event_name}
      </div>
      <div className="w-full max-w-xl mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Team 1 ({scores.team1Score})
        </h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={match.team_1.player_1}
            onChange={(e) => updatePlayer("team_1", "player_1", e.target.value)}
            placeholder="Player 1"
            className="border px-2 py-1 rounded w-1/2"
          />
          <input
            type="text"
            value={match.team_1.player_2}
            onChange={(e) => updatePlayer("team_1", "player_2", e.target.value)}
            placeholder="Player 2 (optional)"
            className="border px-2 py-1 rounded w-1/2"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2">
          Team 2 ({scores.team2Score})
        </h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={match.team_2.player_1}
            onChange={(e) => updatePlayer("team_2", "player_1", e.target.value)}
            placeholder="Player 1"
            className="border px-2 py-1 rounded w-1/2"
          />
          <input
            type="text"
            value={match.team_2.player_2}
            onChange={(e) => updatePlayer("team_2", "player_2", e.target.value)}
            placeholder="Player 2 (optional)"
            className="border px-2 py-1 rounded w-1/2"
          />
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
            onClick={() => {
              if (!event || typeof matchIndex !== "number") return;
              if (!match.team_1.player_1 || !match.team_2.player_1) return;
              const updatedMatches = event.matches.map((m, idx) => {
                if (idx === matchIndex) {
                  // Add a new set: MatchSet is Game[], so push an empty array
                  const newSet: MatchSet = [];
                  return { ...m, sets: [...m.sets, newSet] };
                }
                return m;
              });
              dispatch(addEvent({ ...event, matches: updatedMatches }));
              const newSetIndex = match.sets.length;
              setQueryParams({
                page: "match_set",
                match_set: newSetIndex,
              });
            }}
            disabled={!match.team_1.player_1 || !match.team_2.player_1}
          >
            Start New Set
          </button>
        </div>
      </div>

      <ul className="divide-y mt-6">
        {match.sets.map((matchSet, setIdx) => {
          return <SetLi key={setIdx} setIdx={setIdx} matchSet={matchSet} />;
        })}
      </ul>
    </div>
  );
};

// this will be list of sets from the current match
const SetLi: React.FC<{ matchSet: MatchSet; setIdx: number }> = ({
  matchSet,
  setIdx,
}) => {
  const [query, setQueryParams] = useAppQueryParams();
  const team1SetScore = matchSet.filter(
    (game) =>
      game.filter((point) => point === "team_1").length >
      game.filter((point) => point === "team_2").length
  ).length;
  const team2SetScore = matchSet.filter(
    (game) =>
      game.filter((point) => point === "team_2").length >
      game.filter((point) => point === "team_1").length
  ).length;
  return (
    <li key={setIdx} className="flex items-center justify-between py-2">
      <button
        className="flex-1 text-left px-2 py-1 hover:bg-gray-100 rounded"
        onClick={() => {
          setQueryParams({
            page: "match_set",
            match_set: setIdx,
          });
        }}
      >
        Set {setIdx + 1} — Team 1: {team1SetScore} | Team 2: {team2SetScore}
      </button>
      <button
        className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
        onClick={() => {
          // if (window.confirm("Delete this set?")) {
          //   const updatedMatches = event.matches.map((m, idx) => {
          //     if (idx === matchIndex) {
          //       return {
          //         ...m,
          //         sets: m.sets.filter((_, i) => i !== setIdx),
          //       };
          //     }
          //     return m;
          //   });
          //   dispatch(addEvent({ ...event, matches: updatedMatches }));
          // }
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Match;
