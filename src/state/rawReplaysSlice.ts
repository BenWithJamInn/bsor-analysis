import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RawReplayState {
  activeScoreID: string | null;
  scores: {
    [key: string]: ReplayData
  }
}

interface ReplayData {
  scoreInfo: { [key: string]: any }
  decodedReplay: { [key: string]: any }
}

const initialState: RawReplayState = {
  activeScoreID: null,
  scores: {}
}

const rawScoreSlice = createSlice({
  name: "rawReplays",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<{id: string, data: ReplayData}>) => {
      state.activeScoreID = action.payload.id;
      state.scores[action.payload.id] = action.payload.data;
    }
  }
})

export const {addScore} = rawScoreSlice.actions;

export default rawScoreSlice.reducer;