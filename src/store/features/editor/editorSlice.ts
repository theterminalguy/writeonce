import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EditorState {
  templateName: string;
  contentText: string;
  contentHTML: string;
}

const initialState: EditorState = {
  templateName: "New Template",
  contentText: "",
  contentHTML: "",
};

interface EditorPayload {
  templateName: string;
  contentText: string;
  contentHTML: string;
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<EditorPayload>) {
      state.templateName = action.payload.templateName;
      state.contentText = action.payload.contentText;
      state.contentHTML = action.payload.contentHTML;
    },
    setPlainText(state, action: PayloadAction<string>) {
      state.contentText = action.payload;
    },
    setHtmlText(state, action: PayloadAction<string>) {
      state.contentHTML = action.payload;
    },
    setTemplateName(state, action: PayloadAction<string>) {
      state.templateName = action.payload;
    },
  },
});

export const { setContent, setPlainText, setHtmlText, setTemplateName } =
  editorSlice.actions;

export default editorSlice.reducer;
