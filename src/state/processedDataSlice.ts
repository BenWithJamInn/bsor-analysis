import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataFrame} from "danfojs";

export interface ProcessedData {
  timeSeries: DataFrame | null;
}

const initialState: ProcessedData = {
  timeSeries: null
}

const processedDataSlice = createSlice({
  name: "rawReplays",
  initialState,
  reducers: {
    setCurrentProcessedData: (state, action: PayloadAction<DataFrame>) => {
      state.timeSeries = action.payload;
    }
  }
})

export const {setCurrentProcessedData} = processedDataSlice.actions;

export default processedDataSlice.reducer;
