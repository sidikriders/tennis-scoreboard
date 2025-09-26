import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/index";
import { useAppQueryParams } from "./utils";

const Event: React.FC = () => {
  const [query, setQuery] = useAppQueryParams();
  const event = useSelector((state: RootState) =>
    query.event_slug ? state.events[query.event_slug] : undefined
  );
  const dispatch = useDispatch();

  if (!event) {
    return <div className="text-red-500">Event not found.</div>;
  }

  const handleCreateMatch = () => {
    // Default empty match object
    const newMatch = {
      team_1: { player_1: "", player_2: "" },
      team_2: { player_1: "", player_2: "" },
      final_score: { team_1: 0, team_2: 0 },
      sets: [],
    };
    const updatedEvent = {
      ...event,
      matches: [...event.matches, newMatch],
    };
    dispatch({ type: "event/addEvent", payload: updatedEvent });
    // Redirect to match page with new match index
    setQuery({
      page: "match",
      event_slug: event.event_slug,
      match: event.matches.length,
    });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">
        Event Page: {event.event_name}
      </h1>
      <div className="text-gray-600 mb-4">Slug: {event.event_slug}</div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-6"
        onClick={handleCreateMatch}
      >
        Create New Match
      </button>
      <div className="w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Matches</h2>
        <ul className="space-y-2">
          {event.matches.length === 0 && (
            <li className="text-gray-500">No matches yet.</li>
          )}
          {event.matches.map((_, idx) => (
            <li key={idx}>
              <button
                className="w-full text-left px-4 py-2 border rounded hover:bg-blue-50"
                onClick={() =>
                  setQuery({
                    page: "match",
                    event_slug: event.event_slug,
                    match: idx,
                  })
                }
              >
                Match {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Event;
