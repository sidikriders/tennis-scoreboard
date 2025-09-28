import React from "react";
import PageLayout from "./PageLayout";
import { useAppQueryParams } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import EventNotFound from "./EventNotFound";
import { Calendar, MapPin, PersonStanding, Swords } from "lucide-react";
import CreateMatchV2 from "./CreateMatchV2";
import { getScore } from "../scoreUtils";
import dayjs from "dayjs/esm";
import { addPointToTeamInMatchV2 } from "../store/eventV2Slice";

const EventMatchV2: React.FC = () => {
  const [queryParams] = useAppQueryParams();
  const dispatch = useDispatch();
  const event = useSelector(
    (state: RootState) => state.events_v2?.[queryParams.event_slug]
  );

  const addPoint = (teamStr: "team_1" | "team_2") => {
    dispatch(
      addPointToTeamInMatchV2({
        eventSlug: queryParams.event_slug || "",
        matchIdx: Number(queryParams.match),
        team: teamStr,
      })
    );
  };
  const undoLastPoint = () => {};

  const [pressedTeam, setPressedTeam] = React.useState<1 | 2 | null>(null);

  // Helper to trigger press animation
  const handlePress = (team: 1 | 2) => {
    setPressedTeam(team);
    setTimeout(() => setPressedTeam(null), 150);
    addPoint(team === 1 ? "team_1" : "team_2");
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
  if (!match && !isNewMatch) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <EventNotFound text="Match not found." />
      </PageLayout>
    );
  }

  if (isNewMatch) {
    return <CreateMatchV2 />;
  }

  const matchSets = match?.sets || [];
  const setIndex = matchSets.length - 1;
  const currentSet = matchSets[setIndex];
  if (!currentSet) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <EventNotFound text="No sets found for this match, please create new match!" />
      </PageLayout>
    );
  }

  const team1SetPoints = currentSet.games
    ? currentSet.games.filter((g) => g.winner === "team_1").length
    : 0;
  const team2SetPoints = currentSet.games
    ? currentSet.games.filter((g) => g.winner === "team_2").length
    : 0;

  const matchSetGames = currentSet.games || [];
  const gameIndex = matchSetGames.length - 1;
  const currentGame = matchSetGames[gameIndex];
  if (!currentGame) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <EventNotFound text="No games found for this match, please create new match!" />
      </PageLayout>
    );
  }

  const parsedTeam1Points = getScore(
    currentGame.team_1_points,
    currentGame.team_2_points,
    event.config.maxPointsInGame
  );
  const parsedTeam2Points = getScore(
    currentGame.team_2_points,
    currentGame.team_1_points,
    event.config.maxPointsInGame
  );

  return (
    <PageLayout title="Event Match" titleIcon={<Swords />}>
      <div className="flex gap-2 flex-wrap justify-center text-xs">
        <p className="flex items-center gap-2">
          <PersonStanding className="w-5 h-5" /> {event.name}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5" /> {event.location || "Unknown"}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />{" "}
          {dayjs(event.date).format("DD MMM YYYY")}
        </p>
        <p className="flex items-center gap-2">
          <Swords className="w-5 h-5" /> Match {matchIndex + 1}
        </p>
      </div>
      <p className="text-center text-sm mb-4">
        Set: {setIndex + 1} - Game: {gameIndex + 1}
      </p>

      {/* current score board */}
      <div className="flex items-center justify-center gap-4 my-8">
        {/* Team 1 */}
        <div
          className={`flex flex-col items-center bg-blue-50 rounded-lg p-4 shadow w-40 cursor-pointer select-none transition-transform duration-150 ${
            pressedTeam === 1 ? "scale-105" : ""
          }`}
          onClick={() => handlePress(1)}
        >
          <div className="flex gap-2">
            <p className="font-bold text-blue-700 mb-1">
              {match.team_1.player_1}
            </p>
            {match.team_1.player_2 && (
              <>
                <p className="font-bold text-blue-700 mb-1">&</p>
                <p className="font-bold text-blue-700 mb-1">
                  {match.team_1.player_2}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-8xl font-bold text-blue-800 mb-1">
              {parsedTeam1Points === "Sudden" || parsedTeam1Points === "Adv" ? (
                <span className="text-4xl inline-block">
                  {parsedTeam1Points}
                </span>
              ) : (
                parsedTeam1Points
              )}
            </span>
            <span className="text-xs text-gray-500">Game Points</span>
            <span className="text-xl font-semibold text-blue-700 mt-2">
              {team1SetPoints}
            </span>
            <span className="text-xs text-gray-500">Set Points</span>
          </div>
        </div>
        {/* VS divider */}
        <div className="text-2xl font-bold text-gray-400">VS</div>
        {/* Team 2 */}
        <div
          className={`flex flex-col items-center bg-red-50 rounded-lg p-4 shadow w-40 cursor-pointer select-none transition-transform duration-150 ${
            pressedTeam === 2 ? "scale-105" : ""
          }`}
          onClick={() => handlePress(2)}
        >
          <div className="flex gap-2">
            <p className="font-bold text-red-700 mb-1">
              {match.team_2.player_1}
            </p>
            {match.team_2.player_2 && (
              <>
                <p className="font-bold text-red-700 mb-1">&</p>
                <p className="font-bold text-red-700 mb-1">
                  {match.team_2.player_2}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-8xl font-bold text-red-800 mb-1">
              {parsedTeam2Points === "Sudden" || parsedTeam2Points === "Adv" ? (
                <span className="text-4xl inline-block">
                  {parsedTeam2Points}
                </span>
              ) : (
                parsedTeam2Points
              )}
            </span>
            <span className="text-xs text-gray-500">Game Points</span>
            <span className="text-xl font-semibold text-red-700 mt-2">
              {team2SetPoints}
            </span>
            <span className="text-xs text-gray-500">Set Points</span>
          </div>
        </div>
      </div>

      {/* button to add point */}
      {/* <div className="flex gap-4 justify-center items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors flex-grow"
          onClick={() => addPoint("team_1")}
        >
          Point to Team 1
        </button>
        <div className="text-2xl font-bold text-gray-400 opacity-0">VS</div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition-colors flex-grow"
          onClick={() => addPoint("team_2")}
        >
          Point to Team 2
        </button>
      </div> */}
      <div className="flex justify-center items-center my-8">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 transition-colors"
          onClick={() => undoLastPoint()}
        >
          Undo Last Point
        </button>
      </div>
    </PageLayout>
  );
};

export default EventMatchV2;
