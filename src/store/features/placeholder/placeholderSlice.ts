import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PlaceholderState {
  id: string;
  name: string;
  originalText: string;
  dataType: string;
  required: boolean;
  default: string;
  description: string;
}

export interface PlaceholderPayload {
  id: string;
  name: string;
  originalText: string;
  dataType?: string;
  required?: boolean;
  default?: string;
  description?: string;
}

export const initialState: PlaceholderState[] = [];

export const placeholdersSlice = createSlice({
  name: "placeholders",
  initialState,
  reducers: {
    // adPlaceholder set default value for dataType and required
    addPlaceholder(state, action: PayloadAction<PlaceholderPayload>) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        originalText: action.payload.originalText,
        dataType: action.payload.dataType || "string",
        required: action.payload.required || false,
        default: action.payload.default || "",
        description: action.payload.description || "",
      });
    },
    removePlaceholder(state, action: PayloadAction<string>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload
      );
      state.splice(index, 1);
    },
    updatePlaceholder(state, action: PayloadAction<PlaceholderState>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload.id
      );
      state[index] = action.payload;
    },
  },
});

export const { addPlaceholder, removePlaceholder, updatePlaceholder } =
  placeholdersSlice.actions;

export default placeholdersSlice.reducer;
