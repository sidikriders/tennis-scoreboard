import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EventV2 = {
  name: string;
  date: string;
  location: string;
  players: string[];
  matches: MatchV2[];
  config: {
    setsPerMatch: number;
    gamesPerSet: number;
    maxPointsInGame: number;
  };
};

export type MatchV2 = {
  team_1: {
    player_1: string;
    player_2?: string;
  };
  team_2: {
    player_1: string;
    player_2?: string;
  };
  sets: MatchSetV2[];
  status: "scheduled" | "in-progress" | "completed";
};

export type MatchSetV2 = {
  winner: "team_1" | "team_2" | null;
  games: MatchSetGameV2[];
};

export type MatchSetGameV2 = {
  winner: "team_1" | "team_2" | null;
  team_1_points: number;
  team_2_points: number;
  point_history: ("team_1" | "team_2")[];
};

export type EventV2State = Record<string, EventV2>;

const initialState: EventV2State = {};

export const eventV2Slice = createSlice({
  name: "eventV2",
  initialState,
  reducers: {
    addEventV2: (
      state,
      action: PayloadAction<{ slug: string; event: EventV2 }>
    ) => {
      state[action.payload.slug] = action.payload.event;
    },
    updateEventV2: (
      state,
      action: PayloadAction<{ slug: string; event: EventV2 }>
    ) => {
      state[action.payload.slug] = action.payload.event;
    },
    removeEventV2: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    addMatchToEventV2: (
      state,
      action: PayloadAction<{ slug: string; match: MatchV2 }>
    ) => {
      const event = state[action.payload.slug];
      if (event) {
        event.matches.push(action.payload.match);
      }
    },
    addPointToTeamInMatchV2: (
      state,
      action: PayloadAction<{
        eventSlug: string;
        matchIdx: number;
        team: "team_1" | "team_2";
      }>
    ) => {
      const { eventSlug, matchIdx, team } = action.payload;
      const event = state[eventSlug];
      if (!event) return;
      const match = event.matches[matchIdx];
      if (!match) return;
      if (match.status !== "in-progress") return;

      const currentSet = match.sets[match.sets.length - 1];
      if (!currentSet) return;
      const currentGame = currentSet.games[currentSet.games.length - 1];
      if (!currentGame) return;

      // Add point to the history and to the specified team
      currentGame.point_history.push(team);
      if (team === "team_1") {
        currentGame.team_1_points += 1;
      } else {
        currentGame.team_2_points += 1;
      }

      const team1Points = currentGame.team_1_points;
      const team2Points = currentGame.team_2_points;
      // check win condition, win condition is
      // if team reach point 4 and lead by 2 points
      // or if both team reach point 3, then win by 2 points
      // or if some team reach maxPointsInGame and lead by 1 point
      const maxPointsInGame =
        event.config.maxPointsInGame === -1
          ? Infinity
          : event.config.maxPointsInGame;
      const getScore = (team1Points: number, team2Points: number) => {
        if (team1Points >= 4 && team1Points - team2Points >= 2) {
          return "Win";
        }
        if (team1Points >= 3 && team2Points >= 3) {
          if (Math.abs(team1Points - team2Points) >= 2) {
            return "Win";
          }
        }
        if (team1Points >= maxPointsInGame) {
          if (team1Points - team2Points >= 1) {
            return "Win";
          }
        }
        return "Ongoing";
      };

      const team1Score = getScore(team1Points, team2Points);
      const team2Score = getScore(team2Points, team1Points);

      if (team1Score === "Win") {
        currentGame.winner = "team_1";
      } else if (team2Score === "Win") {
        currentGame.winner = "team_2";
      }

      if (!currentGame.winner) {
        return; // Game is still ongoing
      }

      // If game is won, prepare next game
      const gamesPerSet =
        event.config.gamesPerSet === -1 ? Infinity : event.config.gamesPerSet;
      if (currentSet.games.length < gamesPerSet) {
        // Start a new game in the current set
        currentSet.games.push({
          winner: null,
          team_1_points: 0,
          team_2_points: 0,
          point_history: [],
        });
        return;
      }

      // Set is over, determine set winner
      const team1SetPoints = currentSet.games.filter(
        (g) => g.winner === "team_1"
      ).length;
      const team2SetPoints = currentSet.games.filter(
        (g) => g.winner === "team_2"
      ).length;
      if (team1SetPoints > team2SetPoints) {
        currentSet.winner = "team_1";
      } else if (team2SetPoints > team1SetPoints) {
        currentSet.winner = "team_2";
      }

      // Check if match is over
      const setsPerMatch =
        event.config.setsPerMatch === -1 ? Infinity : event.config.setsPerMatch;
      // Match not over, adding a new set
      if (match.sets.length < setsPerMatch) {
        match.sets.push({
          winner: null,
          games: [
            {
              winner: null,
              team_1_points: 0,
              team_2_points: 0,
              point_history: [],
            },
          ],
        });
        return;
      }

      // match is over, update status
      match.status = "completed";
    },
  },
});

export const {
  addEventV2,
  updateEventV2,
  removeEventV2,
  addMatchToEventV2,
  addPointToTeamInMatchV2,
} = eventV2Slice.actions;
export default eventV2Slice.reducer;
