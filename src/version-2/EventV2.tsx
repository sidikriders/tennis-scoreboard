import React from "react";
import PageLayout from "./PageLayout";
import { useAppQueryParams } from "../utils";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Calendar, CalendarDays, MapPin, Swords, Users } from "lucide-react";
import dayjs from "dayjs/esm/index.js";
import EventNotFound from "./EventNotFound";

const EventV2: React.FC = () => {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const eventSlug = queryParams.event_slug;
  const event = useSelector((state: RootState) =>
    eventSlug ? state.events_v2?.[eventSlug] : undefined
  );

  const startNewMatch = () => {
    if (!event) return;
    const lastMatchIndex = event.matches.length - 1;
    const newMatchIndex = lastMatchIndex + 1;
    setQueryParams({
      event_slug: eventSlug,
      page: "match",
      match: newMatchIndex,
    });
  };

  if (!event) {
    return (
      <PageLayout
        title={"Event Detail"}
        titleIcon={<CalendarDays className="inline-block mr-2" />}
      >
        <EventNotFound />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={event?.name || "Event Detail"}
      titleIcon={<CalendarDays className="inline-block mr-2" />}
    >
      <p className="text-gray-700 mb-4 flex items-center justify-center">
        <MapPin className="inline-block mr-2" />
        {event.location || "Unknown"}
        <Calendar className="inline-block mr-2 ml-2" />
        {!event?.date ? "Unknown" : dayjs(event.date).format("DD MMM YYYY")}
      </p>

      <div className="flex gap-4 justify-center my-8">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-[0.25]"
          disabled={
            Array.isArray(event.players) ? event.players.length < 2 : true
          }
          onClick={() => startNewMatch()}
        >
          <Swords className="w-5 h-5" />
          Start Match
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setQueryParams({ page: "manage_players" });
          }}
        >
          <Users className="w-5 h-5" />
          Manage Players
        </button>
      </div>
    </PageLayout>
  );
};

export default EventV2;
