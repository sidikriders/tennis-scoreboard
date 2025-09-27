import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, eventSlice, type Event } from "./store/eventSlice";
import type { RootState } from "./store/index";
import { useAppQueryParams } from "./utils";

const Home: React.FC = () => {
  const [, setQuery] = useAppQueryParams();
  const [showInput, setShowInput] = useState(false);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);
  const { removeEvent } = eventSlice.actions;
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(
    null
  );

  const handleCreateEvent = () => {
    setShowInput(true);
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    setError("");
  };

  // Utility to generate slug from event name
  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = eventName.trim();
    if (!trimmedName) return;
    const slug = generateSlug(trimmedName);
    if (events[slug]) {
      setError("Event slug already exists. Please choose a different name.");
      return;
    }
    dispatch(
      addEvent({ event_name: trimmedName, event_slug: slug, matches: [] })
    );
    setQuery({ page: "event", event_slug: slug });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Tennis Scoreboard</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {!showInput ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleCreateEvent}
        >
          Create New Event
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <input
            type="text"
            value={eventName}
            onChange={handleInputChange}
            placeholder="Enter event name"
            className="border px-2 py-1 rounded"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Go to Event Page
          </button>
        </form>
      )}
      <div className="w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Existing Events</h2>
        <ul className="space-y-2">
          {Object.values(events).length === 0 && (
            <li className="text-gray-500">No events yet.</li>
          )}
          {Object.values(events).map((event: Event) => (
            <li key={event.event_slug} className="flex items-center gap-2">
              <button
                className="flex-1 text-left px-4 py-2 border rounded hover:bg-blue-50"
                onClick={() =>
                  setQuery({ page: "event", event_slug: event.event_slug })
                }
              >
                <span className="font-bold text-blue-600">
                  {event.event_name}
                </span>
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded text-xs ml-2"
                onClick={() => setConfirmDeleteSlug(event.event_slug)}
              >
                Delete
              </button>
            </li>
          ))}
          {confirmDeleteSlug && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
                <p className="mb-4">
                  Are you sure you want to delete this event?
                </p>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                      dispatch(removeEvent(confirmDeleteSlug));
                      setConfirmDeleteSlug(null);
                    }}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setConfirmDeleteSlug(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
