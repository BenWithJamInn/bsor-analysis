import { configureStore } from '@reduxjs/toolkit'
import rawReplayReducer from "./rawReplaysSlice";

export const store = configureStore({
  reducer: {
    rawReplays: rawReplayReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
