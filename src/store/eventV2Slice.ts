import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EventV2 = {
  name: string;
  date: string;
  location: string;
  players: string[];
  matches: MatchV2[];
  config: {
    setsToWin: number;
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
  },
});

export const { addEventV2, updateEventV2, removeEventV2, addMatchToEventV2 } =
  eventV2Slice.actions;
export default eventV2Slice.reducer;
