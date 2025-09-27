import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EventV2 = {
  name: string;
  slug: string;
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

export interface EventV2State {
  events_v2: EventV2[];
}

const initialState: EventV2State = {
  events_v2: [],
};

export const eventV2Slice = createSlice({
  name: "eventV2",
  initialState,
  reducers: {
    setEventsV2: (state, action: PayloadAction<EventV2[]>) => {
      state.events_v2 = action.payload;
    },
    addEventV2: (state, action: PayloadAction<EventV2>) => {
      state.events_v2.push(action.payload);
    },
    updateEventV2: (state, action: PayloadAction<EventV2>) => {
      const idx = state.events_v2.findIndex(
        (e) => e.slug === action.payload.slug
      );
      if (idx !== -1) state.events_v2[idx] = action.payload;
    },
    removeEventV2: (state, action: PayloadAction<string>) => {
      state.events_v2 = state.events_v2.filter(
        (e) => e.slug !== action.payload
      );
    },
  },
});

export const { setEventsV2, addEventV2, updateEventV2, removeEventV2 } =
  eventV2Slice.actions;
export default eventV2Slice.reducer;
