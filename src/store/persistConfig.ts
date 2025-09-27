import storage from "redux-persist/lib/storage";
import type { PersistConfig } from "redux-persist";
import type { EventState } from "./eventSlice";
import type { EventV2State } from "./eventV2Slice";

type PersistedState = Partial<{
  events: EventState;
  events_v2: EventV2State;
}>;

const persistConfig: PersistConfig<PersistedState> = {
  key: "root",
  storage,
  whitelist: ["events", "events_v2"], // persist both event slices
};

export default persistConfig;
