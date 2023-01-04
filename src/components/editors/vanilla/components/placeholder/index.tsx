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
    /**
     * Attibutes:
     * - data-placeholder-id (string) - id of the placeholder
     * - data-placeholder-name (string) - name of the placeholder
     * - data-placeholder-original-text (string) - original text of the placeholder (before it was replaced with {{.name}})
     *
     * Classes:
     * - vanilla__placeholder (string) - class for all placeholders
     * - vanilla__placeholder-group-${id} (string) - class for all placeholder specific to a group
     */
    const placeholder = document.createElement("span");
    placeholder.classList.add(
      "vanilla__placeholder",
      `vanilla__placeholder-${this.id}`,
      `vanilla__placeholder-group-${this.id}`
    );
    placeholder.setAttribute("data-placeholder-id", this.id);
    placeholder.setAttribute("data-placeholder-name", this.name);
    placeholder.setAttribute(
      "data-placeholder-original-text",
      this.originalText
    );
    placeholder.setAttribute("contenteditable", "false");
    placeholder.innerHTML = `{{.${this.name}}}`;
    return placeholder;
  }
}

export const $getPlaceholder = (
  placeholderId: string
): HTMLSpanElement | null => {
  return document.querySelector(
    `span.vanilla__placeholder-${placeholderId}`
  ) as HTMLSpanElement | null;
};

export const $placeholdify = (input: string): string => `{{.${input}}}`;

export const $undoPlaceholdify = (uniqueId: string): boolean => {
  // undo the placeholder creation
  const placeholder = $getPlaceholder(uniqueId);
  if (!placeholder) {
    // TODO: show error to the user
    console.error("Placeholder not found");
    return false;
  }
  const originalText = placeholder.getAttribute(
    "data-placeholder-original-text"
  );
  if (!originalText) {
    // TODO: show error to the user
    console.error("Original text not found");
    return false;
  }
  const textNode = document.createTextNode(originalText);
  placeholder.parentNode?.replaceChild(textNode, placeholder);
  return true;
};
