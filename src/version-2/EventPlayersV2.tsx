import React, { useState } from "react";
import PageLayout from "./PageLayout";
import { useAppQueryParams } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { Users, UserPlus, Trash2, MoveLeft } from "lucide-react";
import { updateEventV2 } from "../store/eventV2Slice";
import EventNotFound from "./EventNotFound";

const EventPlayersV2: React.FC = () => {
  const [queryParams, setQuerParams] = useAppQueryParams();
  const dispatch = useDispatch();
  const event = useSelector(
    (state: RootState) => state.events_v2?.[queryParams.event_slug || ""]
  );
  const players = event?.players || [];
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (!event) {
    return (
      <PageLayout title="Manage Players" titleIcon={<Users />}>
        <EventNotFound />
      </PageLayout>
    );
  }

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = playerName.trim();
    if (!trimmed) {
      setError("Player name is required");
      return;
    }
    if (
      players.some((p: string) => p.toLowerCase() === trimmed.toLowerCase())
    ) {
      setError("Player name must be unique");
      return;
    }
    dispatch(
      updateEventV2({
        slug: queryParams.event_slug,
        event: { ...event, players: [...players, trimmed] },
      })
    );
    setPlayerName("");
    setError("");
  };

  const handleDeletePlayer = (name: string) => {
    dispatch(
      updateEventV2({
        slug: queryParams.event_slug,
        event: { ...event, players: players.filter((p: string) => p !== name) },
      })
    );
    setConfirmDelete(null);
  };

  return (
    <PageLayout title="Manage Players" titleIcon={<Users />}>
      <p
        className="hover:underline hover:cursor-pointer hover:text-blue-600 transition-colors -mt-4 mb-4 text-center"
        onClick={() => setQuerParams({ page: "event" })}
      >
        <MoveLeft className="w-4 h-4 inline-block" /> Back to Event
      </p>
      <form onSubmit={handleAddPlayer} className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 bg-white"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded"
        >
          <UserPlus className="w-4 h-4" /> Add
        </button>
      </form>
      {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
      <ul className="space-y-2">
        {players.length === 0 && (
          <li className="text-gray-500">No players yet.</li>
        )}
        {players.map((name: string) => (
          <li key={name} className="flex items-center gap-2">
            <span className="flex-1 px-2 py-1 shadow rounded bg-gray-50">
              {name}
            </span>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded flex items-center gap-1"
              onClick={() => setConfirmDelete(name)}
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </li>
        ))}
      </ul>
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-bold">{confirmDelete}</span>?<br />
              <span className="text-xs text-gray-500">
                Matches with this player will still exist, but this player will
                be removed from the event.
              </span>
            </p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDeletePlayer(confirmDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default EventPlayersV2;
