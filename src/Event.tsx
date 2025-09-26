import React from 'react';
import { useQueryParams, StringParam } from 'use-query-params';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';

const Event: React.FC = () => {
  const [query] = useQueryParams({ event_slug: StringParam });
  const event = useSelector((state: RootState) =>
    query.event_slug ? state.events[query.event_slug] : undefined
  );

  if (!event) {
    return <div className="text-red-500">Event not found.</div>;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Event Page: {event.event_name}</h1>
      <div className="text-gray-600">Slug: {event.event_slug}</div>
      {/* You can render matches and other event details here */}
    </div>
  );
};

export default Event;
