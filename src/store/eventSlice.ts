import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Game {
  points: Array<"team_1" | "team_2">;
  winner: "team_1" | "team_2" | null;
}

export interface Event {
  event_name: string;
  event_slug: string;
  matches: Array<{
    team_1: {
        player_1: string;
        player_2?: string;
    },
    team_2: {
        player_1: string;
        player_2?: string;
    },
    final_score: {
      team_1: number;
      team_2: number;
    },
    sets: Game[];
  }>;
}

export interface EventState {
  events: Record<string, Event>;
}

const initialState: EventState = {
  events: {},
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events[action.payload.event_slug] = action.payload;
    },
  },
});

export const { addEvent } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
