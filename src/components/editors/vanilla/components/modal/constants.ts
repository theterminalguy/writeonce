export enum ModalType {
  // Prompt is a modal that has a text input field with two buttons (OK and Cancel)
  Prompt = "prompt",

  // Confirm is a modal that has two buttons (OK and Cancel) and no text input field
  Confirm = "confirm",

  // Alert is a modal that has one button (OK) and no text input field
  Alert = "alert",
}
