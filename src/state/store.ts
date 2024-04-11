import { configureStore } from '@reduxjs/toolkit'
import rawReplayReducer from "./rawReplaysSlice";
import processedDataReducer from "./processedDataSlice";

export const store = configureStore({
  reducer: {
    scoreData: rawReplayReducer,
    processedData: processedDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
