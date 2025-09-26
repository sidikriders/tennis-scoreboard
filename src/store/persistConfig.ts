import storage from 'redux-persist/lib/storage';
import type { PersistConfig } from 'redux-persist';
import type { EventState } from './eventSlice';

const persistConfig: PersistConfig<EventState> = {
  key: 'root',
  storage,
  whitelist: ['events'], // only persist the events slice
};

export default persistConfig;
