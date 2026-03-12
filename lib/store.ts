import { configureStore } from '@reduxjs/toolkit';
import graphSlice from './slices/graphSlicePeople';

export const store = configureStore({
  reducer: {
    graph: graphSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
