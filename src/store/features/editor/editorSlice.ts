import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EditorState {
  id: string;
  slug: string;
  templateName: string;
  contentText: string;
  contentHTML: string;
  created_at: string;
  updated_at?: string;
}

export const initialState: EditorState[] = []

interface EditorPayload {
  id: string;
  slug?: string;
  templateName?: string;
  contentText?: string;
  contentHTML?: string;
  created_at?: string;
  updated_at?: string;
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
      
      if (action.payload.templateName) {
        placeholder.templateName = action.payload.templateName;
        const templateSlug = action.payload.templateName.replace(/\s+/g, "-").toLowerCase();
        const slug = `${templateSlug}-${action.payload.id}`;
        placeholder.slug = slug;
      }

      if (action.payload.contentText) {
        placeholder.contentText = action.payload.contentText;
      }

      if (action.payload.contentHTML) {
        placeholder.contentHTML = action.payload.contentHTML;
      }

      if (action.payload.updated_at) {
        placeholder.updated_at = action.payload.updated_at;
      }
    },
    addTemplate(state, action: PayloadAction<EditorPayload>) {
      state.push({
        id: action.payload.id,
        slug: action.payload.slug || `untitled-template-${action.payload.id}`,
        templateName: action.payload.templateName || "Untitled Template",
        contentText: action.payload.contentText || "",
        contentHTML: action.payload.contentHTML || "", 
        created_at: action.payload.created_at || new Date().toUTCString(),
        updated_at: action.payload.updated_at || new Date().toUTCString(),
      });
    },
    deleteTemplate(state, action: PayloadAction<string>) {
      const index = state.findIndex(
        (placeholder) => placeholder.id === action.payload
      );
      state.splice(index, 1);
    }
  },
});

export const { addTemplate, updateTemplate, deleteTemplate } = editorSlice.actions;

export default editorSlice.reducer;
