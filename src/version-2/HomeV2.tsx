import React, { useState } from "react";
import PageLayout from "./PageLayout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useAppQueryParams } from "../utils";
import { removeEventV2 } from "../store/eventV2Slice";

const HomeV2: React.FC = () => {
  const dispatch = useDispatch();
  const eventsV2 = useSelector((state: RootState) => state.events_v2 || {});
  const eventSlugs = Object.keys(eventsV2);
  // const [showInput, setShowInput] = useState(false);
  // const [eventName, setEventName] = useState("");
  // const [error, setError] = useState("");
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(
    null
  );

  const [, setQueryParams] = useAppQueryParams();
  return (
    <PageLayout title="Tennis Scoreboard">
      <div className="flex flex-col">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4 max-w-fit"
          onClick={() => {
            setQueryParams({ page: "create_event" });
          }}
        >
          Create New Event
        </button>
        <div className="w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Existing Events</h2>
          <ul className="space-y-2">
            {eventSlugs.length === 0 && (
              <li className="text-gray-500">No events yet.</li>
            )}
            {eventSlugs.map((eventSlug) => {
              const event = eventsV2[eventSlug];
              if (!event) return null;

              return (
                <li key={eventSlug} className="flex items-center gap-2">
                  <span className="flex-1 px-4 py-2 border rounded bg-gray-50">
                    <span className="font-bold text-blue-600">
                      {event.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({eventSlug})
                    </span>
                  </span>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs ml-2"
                    onClick={() => setConfirmDeleteSlug(eventSlug)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
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
                        dispatch(removeEventV2(confirmDeleteSlug));
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
    </PageLayout>
  );
};

export default HomeV2;
