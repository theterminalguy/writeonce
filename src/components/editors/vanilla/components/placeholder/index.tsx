import "./index.css";

type PlaceholderProps = {
  id: string;
  name: string;
  originalText: string;
};

export default class Placeholder {
  id: string;
  name: string;
  originalText: string;

  constructor({ id, name, originalText }: PlaceholderProps) {
    this.name = name;
    this.originalText = originalText;
    this.id = id;
  }

  render(): HTMLSpanElement {
    const placeholder = document.createElement("span");
    placeholder.classList.add("vanilla__placeholder");
    placeholder.setAttribute("data-placeholder-id", this.id);
    placeholder.setAttribute("data-placeholder-name", this.name);
    placeholder.setAttribute(
      "data-placeholder-original-text",
      this.originalText
    );
    placeholder.setAttribute("contenteditable", "false");
    placeholder.innerHTML = `{{.${this.name}}}`
    return placeholder;
  }
}
