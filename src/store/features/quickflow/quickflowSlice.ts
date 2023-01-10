import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FlowState {
  componentName: string;
}

export interface FlowPayload {
  componentName: string;
}

export const initialState: FlowState = {
  componentName: "PlaceholderSidePanel",
};

export const flowSlice = createSlice({
  name: "quickflow",
  initialState,
  reducers: {
    setFlow(state, action: PayloadAction<FlowPayload>) {
      state.componentName = action.payload.componentName;
    },
  },
});

export const { setFlow } = flowSlice.actions;

export default flowSlice.reducer;
