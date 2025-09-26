import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Game = Array<"team_1" | "team_2">;

export type MatchSet = Game[];

export type TennisMatch = {
  team_1: {
    player_1: string;
    player_2?: string;
  };
  team_2: {
    player_1: string;
    player_2?: string;
  };
  sets: MatchSet[];
};
export interface Event {
  event_name: string;
  event_slug: string;
  matches: TennisMatch[];
}

export interface EventState {
  events: Record<string, Event>;
}

const initialState: EventState = {
  events: {},
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events[action.payload.event_slug] = action.payload;
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      delete state.events[action.payload];
    },
  },
});

export const { addEvent } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
