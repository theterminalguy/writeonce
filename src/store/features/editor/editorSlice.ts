import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EditorState {
  id: string;
  templateName: string;
  contentText: string;
  contentHTML: string;
}

export const initialState: EditorState[] = []
// {
//   id: "1",
//   templateName: "New Template",
//   contentText: "",
//   contentHTML: "",
// }

interface EditorPayload {
  id: string;
  templateName?: string;
  contentText?: string;
  contentHTML?: string;
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // setTemplateContent(state, action: PayloadAction<EditorPayload>) {
    //   // state.push({
    //   //   id: action.payload.id,
    //   //   templateName: action.payload.templateName || "New Template",
    //   //   contentText: action.payload.contentText,
    //   //   contentHTML: action.payload.contentHTML, 
    //   // });
    //   state.contentText = action.payload.contentText;
    //   state.contentHTML = action.payload.contentHTML;
    // },
    // setTemplateName(state, action: PayloadAction<string>) {
    //   state.templateName = action.payload;
    // },
    updateTemplate(state, action: PayloadAction<EditorPayload>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload.id
      );
      const placeholder = state[index];
      console.log(action.payload)
      if (action.payload.templateName) {
        placeholder.templateName = action.payload.templateName;
      }

      if (action.payload.contentText) {
        placeholder.contentText = action.payload.contentText;
      }

      if (action.payload.contentHTML) {
        placeholder.contentHTML = action.payload.contentHTML;
      }
    },
    addTemplate(state, action: PayloadAction<EditorPayload>) {
      state.push({
        id: action.payload.id,
        templateName: action.payload.templateName || "Untitled Template",
        contentText: action.payload.contentText || "",
        contentHTML: action.payload.contentHTML || "", 
      });
    }
  },
});

export const { addTemplate, updateTemplate } = editorSlice.actions;

export default editorSlice.reducer;
