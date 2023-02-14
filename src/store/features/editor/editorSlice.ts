import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EditorState {
  templateName: string;
  contentText: string;
  contentHTML: string;
}

export const initialState: EditorState = {
  templateName: "Untitled template",
  contentText: "",
  contentHTML: "",
};

interface EditorPayload {
  templateName?: string;
  contentText: string;
  contentHTML: string;
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setTemplateContent(state, action: PayloadAction<EditorPayload>) {
      state.contentText = action.payload.contentText;
      state.contentHTML = action.payload.contentHTML;
    },
    setTemplateName(state, action: PayloadAction<string>) {
      state.templateName = action.payload;
    },
  },
});

export const { setTemplateContent, setTemplateName } = editorSlice.actions;

export default editorSlice.reducer;
