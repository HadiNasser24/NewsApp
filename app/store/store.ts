import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],

  whiteList: ['history'],
};

const middleware = [
  /** Default middle ware with serializable-check to support redux-persist */
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: true,
});
let persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
