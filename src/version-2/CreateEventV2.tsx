import React, { useState } from "react";
import PageLayout from "./PageLayout";
import { CalendarPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addEventV2 } from "../store/eventV2Slice";
import type { RootState } from "../store/index";
import { useAppQueryParams } from "../utils";

const defaultConfigForm = {
  setsPerMatch: 1,
  gamesPerSet: 4,
  deuceOnce: true,
};

const CreateEventV2: React.FC = () => {
  const [, setQueryParams] = useAppQueryParams();
  const dispatch = useDispatch();
  const eventsV2 = useSelector((state: RootState) => state.events_v2 || {});
  const eventsV2Slugs = Object.keys(eventsV2);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [setsPerMatch, setsetsPerMatch] = useState(
    defaultConfigForm.setsPerMatch
  );
  const [gamesPerSet, setGamesPerSet] = useState(defaultConfigForm.gamesPerSet);
  const [deuceOnce, setDeuceOnce] = useState(defaultConfigForm.deuceOnce);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Event name is required");
      return;
    }
    if (!date) {
      setError("Date is required");
      return;
    }
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (eventsV2Slugs.some((sl) => sl === slug)) {
      setError("Event slug already exists. Please choose a different name.");
      return;
    }
    dispatch(
      addEventV2({
        slug,
        event: {
          name: name.trim(),
          date,
          location,
          players: [],
          matches: [],
          config: {
            setsPerMatch,
            gamesPerSet,
            maxPointsInGame: deuceOnce ? 5 : -1, // fixed for now
          },
        },
      })
    );
    setQueryParams({ page: "event", event_slug: slug });
    setName("");
    setDate("");
    setLocation("");
    setsetsPerMatch(defaultConfigForm.setsPerMatch);
    setGamesPerSet(defaultConfigForm.gamesPerSet);
    setDeuceOnce(defaultConfigForm.deuceOnce);
    setError("");
  };

  return (
    <PageLayout
      title="Create New Event"
      titleIcon={<CalendarPlus className="inline-block mr-2" />}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <div className="mb-4 p-2 rounded bg-yellow-100 text-yellow-800 text-sm">
          Config cannot be edited after match created
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Event Name</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Sets per Match</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={setsPerMatch}
            min={1}
            max={5}
            onChange={(e) => setsetsPerMatch(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Games per Set</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={gamesPerSet}
            min={1}
            max={10}
            onChange={(e) => setGamesPerSet(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="deuceOnce"
            checked={deuceOnce}
            onChange={(e) => setDeuceOnce(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="deuceOnce" className="font-medium">
            Deuce once and then sudden.
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </PageLayout>
  );
};

export default CreateEventV2;
