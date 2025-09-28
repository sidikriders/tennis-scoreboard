import React from "react";
import PageLayout from "./PageLayout";
import { useAppQueryParams } from "../utils";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Calendar, CalendarDays, MapPin, Swords, Users } from "lucide-react";
import dayjs from "dayjs/esm/index.js";
import EventNotFound from "./EventNotFound";
import type { MatchV2 } from "../store/eventV2Slice";

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

      <div className="flex flex-col gap-4 items-center">
        {event.matches.length === 0 ? (
          <p className="text-gray-500">No matches yet.</p>
        ) : (
          event.matches.map((match, idx) => (
            <MatchCard key={idx} match={match} matchIdx={idx} />
          ))
        )}
      </div>
    </PageLayout>
  );
};

const MatchCard: React.FC<{ match: MatchV2; matchIdx: number }> = ({
  match,
  matchIdx,
}) => {
  const [, setQueryParams] = useAppQueryParams();
  const matchWinner = match.sets.reduce(
    (obj, matchSet) => {
      if (matchSet.winner === "team_1") {
        obj.team1 += 1;
      } else if (matchSet.winner === "team_2") {
        obj.team2 += 1;
      }

      if (obj.team1 > obj.team2) {
        obj.winner = "team1";
      } else if (obj.team2 > obj.team1) {
        obj.winner = "team2";
      } else {
        obj.winner = null;
      }

      return obj;
    },
    {
      team1: 0,
      team2: 0,
      winner: null as "team1" | "team2" | null,
    }
  ).winner;

  return (
    <div
      className="bg-white rounded-xl shadow border border-gray-200 p-4 mb-4 flex flex-col gap-2 w-full"
      onClick={() => setQueryParams({ page: "match", match: matchIdx })}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-wide font-semibold">
          {match.status}
        </span>
        <span className="text-xs text-gray-400">{match.sets.length} sets</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-blue-700">
          Team 1:{" "}
          <span className="font-normal text-gray-800">
            {match.team_1.player_1}
            {match.team_1.player_2 ? `, ${match.team_1.player_2}` : ""}
          </span>
        </p>
        <p className="font-semibold text-red-500">
          Team 2:{" "}
          <span className="font-normal text-gray-800">
            {match.team_2.player_1}
            {match.team_2.player_2 ? `, ${match.team_2.player_2}` : ""}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-500">Winner:</span>
        <span
          className={`font-bold ${
            matchWinner === "team1"
              ? "text-blue-600"
              : matchWinner === "team2"
              ? "text-pink-600"
              : "text-gray-400"
          }`}
        >
          {matchWinner
            ? matchWinner === "team1"
              ? "Team 1"
              : "Team 2"
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default EventV2;
