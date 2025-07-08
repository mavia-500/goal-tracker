import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import goalsReducer from '../goalSlice/goalSlice';

const persistConfig = {
  key: 'root',
  storage, // Persist to localStorage
  whitelist: ['goals'], // Persist only the 'goals' reducer
};

const persistedReducer = persistReducer(persistConfig, goalsReducer);
export const store = configureStore({
  reducer: {
    goals: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };