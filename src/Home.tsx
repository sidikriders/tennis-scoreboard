import { useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from './store/eventSlice';
import type { RootState } from './store/index';

const Home: React.FC = () => {
  const [, setQuery] = useQueryParams({ page: StringParam, event_slug: StringParam });
  const [showInput, setShowInput] = useState(false);
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  const handleCreateEvent = () => {
    setShowInput(true);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    setError('');
  };

  // Utility to generate slug from event name
  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = eventName.trim();
    if (!trimmedName) return;
    const slug = generateSlug(trimmedName);
    if (events[slug]) {
      setError('Event slug already exists. Please choose a different name.');
      return;
    }
    dispatch(addEvent({ event_name: trimmedName, event_slug: slug, matches: [] }));
    setQuery({ page: 'event', event_slug: slug });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Tennis Scoreboard</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {!showInput ? (
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleCreateEvent}>
          Create New Event
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={eventName}
            onChange={handleInputChange}
            placeholder="Enter event name"
            className="border px-2 py-1 rounded"
            autoFocus
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Go to Event Page
          </button>
        </form>
      )}
    </div>
  );
};

export default Home;
