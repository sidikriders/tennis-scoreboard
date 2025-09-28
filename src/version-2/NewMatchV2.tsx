import React from "react";
import PageLayout from "./PageLayout";
import { Calendar, MapPin, PersonStanding, Swords } from "lucide-react";
import { useAppQueryParams } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import dayjs from "dayjs/esm";
import EventNotFound from "./EventNotFound";
import { addMatchToEventV2, type MatchV2 } from "../store/eventV2Slice";

const NewMatchV2: React.FC = () => {
  const [queryParams] = useAppQueryParams();
  const event = useSelector(
    (state: RootState) => state.events_v2?.[queryParams.event_slug]
  );
  const dispatch = useDispatch();
  const [newPlayers, setNewPlayers] = React.useState(["", "", "", ""]);

  const createNewMatch = () => {
    if (!event) return;
    const newMatch: MatchV2 = {
      team_1: {
        player_1: newPlayers[0] || "",
        player_2: newPlayers[1] || "",
      },
      team_2: {
        player_1: newPlayers[2] || "",
        player_2: newPlayers[3] || "",
      },
      sets: [
        {
          winner: null,
          games: [
            {
              winner: null,
              team_1_points: 0,
              team_2_points: 0,
              point_history: [],
            },
          ],
        },
      ],
      status: "in-progress",
    };

    dispatch(
      addMatchToEventV2({ slug: queryParams.event_slug || "", match: newMatch })
    );
  };

  if (!event) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <EventNotFound />
      </PageLayout>
    );
  }

  const matchIndex = Number(queryParams.match);
  const match = event.matches[matchIndex];
  const isNewMatch = matchIndex === event.matches.length;
  if (!!match || !isNewMatch) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <div className="text-red-500">Match not found.</div>
      </PageLayout>
    );
  }

  // Sort players alphabetically
  const sortedPlayers = [...event.players].sort((a, b) => a.localeCompare(b));

  return (
    <PageLayout title="Start New Match" titleIcon={<Swords />}>
      <p className="mb-2 flex items-center gap-2">
        <PersonStanding className="w-5 h-5" /> {event.name}
      </p>
      <p className="mb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5" /> {event.location || "Unknown"}
      </p>
      <p className="mb-2 flex items-center gap-2">
        <Calendar className="w-5 h-5" />{" "}
        {dayjs(event.date).format("DD MMM YYYY")}
      </p>
      <p className="mb-4 flex items-center gap-2">
        <Swords className="w-5 h-5" /> Match {matchIndex + 1}
      </p>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <div className="mb-6">
          <p className="font-semibold mb-2 text-gray-700">Team 1</p>
          <div className="flex gap-2 mb-2">
            <PlayerDropdown
              players={sortedPlayers}
              selectedPlayer={newPlayers[0]}
              onChange={(player) => {
                setNewPlayers((nps) => [player, nps[1], nps[2], nps[3]]);
              }}
              placeholder="Player 1"
              disabledPlayers={[
                newPlayers[1],
                newPlayers[2],
                newPlayers[3],
              ].filter(Boolean)}
            />
            <PlayerDropdown
              players={sortedPlayers}
              selectedPlayer={newPlayers[1]}
              onChange={(player) => {
                setNewPlayers((nps) => [nps[0], player, nps[2], nps[3]]);
              }}
              placeholder="Player 2"
              disabledPlayers={[
                newPlayers[0],
                newPlayers[2],
                newPlayers[3],
              ].filter(Boolean)}
            />
          </div>
        </div>
        <div className="mb-6">
          <p className="font-semibold mb-2 text-gray-700">Team 2</p>
          <div className="flex gap-2 mb-2">
            <PlayerDropdown
              players={sortedPlayers}
              selectedPlayer={newPlayers[2]}
              onChange={(player) => {
                setNewPlayers((nps) => [nps[0], nps[1], player, nps[3]]);
              }}
              placeholder="Player 1"
              disabledPlayers={[
                newPlayers[0],
                newPlayers[1],
                newPlayers[3],
              ].filter(Boolean)}
            />
            <PlayerDropdown
              players={sortedPlayers}
              selectedPlayer={newPlayers[3]}
              onChange={(player) => {
                setNewPlayers((nps) => [nps[0], nps[1], nps[2], player]);
              }}
              placeholder="Player 2"
              disabledPlayers={[
                newPlayers[0],
                newPlayers[1],
                newPlayers[2],
              ].filter(Boolean)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={
            !newPlayers[0] ||
            !newPlayers[2] ||
            [newPlayers[0], newPlayers[1]].filter(Boolean).length !==
              [newPlayers[2], newPlayers[3]].filter(Boolean).length
          }
          onClick={() => createNewMatch()}
        >
          Start Set 1
        </button>
      </div>
    </PageLayout>
  );
};

const PlayerDropdown: React.FC<{
  players: string[];
  selectedPlayer: string;
  onChange: (player: string) => void;
  placeholder: string;
  disabledPlayers?: string[];
}> = ({ players, selectedPlayer, onChange, placeholder, disabledPlayers }) => {
  return (
    <select
      className={`w-1/2 border rounded px-2 py-1 bg-white${
        selectedPlayer === "" ? " text-gray-400" : ""
      }`}
      value={selectedPlayer}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value="" className="text-gray-900">
        {placeholder}
      </option>
      {players.map((p: string) => {
        const disabled = disabledPlayers?.includes(p);
        return (
          <option
            key={p}
            value={p}
            className={disabled ? "text-gray-400" : "text-gray-900"}
            disabled={disabled}
          >
            {p}
          </option>
        );
      })}
    </select>
  );
};

export default NewMatchV2;
