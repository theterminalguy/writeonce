import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface PlaceholderState {
  id: string;
  name: string;
  originalText: string;
  dataType: string;
  required: boolean;
  default: string;
  description: string;
  occurrences: number;
}

export interface PlaceholderPayload {
  id: string;
  name: string;
  originalText: string;
  dataType?: string;
  required?: boolean;
  default?: string;
  description?: string;
  occurrences?: number;
}

export interface PlaceholderUpdatePayload {
  id: string;
  name?: string;
  originalText?: string;
  dataType?: string;
  required?: boolean;
  default?: string;
  description?: string;
  occurrences?: number;
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
        occurrences: action.payload.occurrences || 1,
      });
    },
    deletePlaceholder(state, action: PayloadAction<string>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload
      );
      state.splice(index, 1);
    },
    updatePlaceholder(state, action: PayloadAction<PlaceholderUpdatePayload>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload.id
      );
      const placeholder = state[index];
      if (action.payload.name) {
        placeholder.name = action.payload.name;
      }
      if (action.payload.originalText) {
        placeholder.originalText = action.payload.originalText;
      }
      if (action.payload.dataType) {
        placeholder.dataType = action.payload.dataType;
      }
      placeholder.required = !!action.payload.required;
      if (action.payload.default) {
        placeholder.default = action.payload.default;
      }
      if (action.payload.description) {
        placeholder.description = action.payload.description;
      }
      if (action.payload.occurrences) {
        placeholder.occurrences = action.payload.occurrences;
      }
    },
    incrementPlaceholderOccurrences(state, action: PayloadAction<string>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload
      );
      state[index].occurrences++;
    }
  },
});

export const {
  addPlaceholder,
  deletePlaceholder,
  updatePlaceholder,
  incrementPlaceholderOccurrences,
} = placeholdersSlice.actions;

export const selectPlaceholderByName = (
  state: RootState,
  name: string
): PlaceholderUpdatePayload | undefined => {
  return state.editorState.placeholders.find(
    (placeholder) => placeholder.name === name
  );
};

export default placeholdersSlice.reducer;
