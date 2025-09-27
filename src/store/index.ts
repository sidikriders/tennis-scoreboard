import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { eventReducer } from "./eventSlice.ts";
import eventV2Reducer from "./eventV2Slice";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  events: eventReducer,
  events_v2: eventV2Reducer,
});

// @ts-expect-error: Type mismatch between redux-persist and redux-toolkit combineReducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
