import "./index.css";
import {
  incrementPlaceholderOccurrences,
  selectPlaceholderByName,
} from "../../../../../store/features/placeholder/placeholderSlice";
import { store } from "../../../../../store";

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
    const placeholderContainer = document.createElement("span")
    placeholderContainer.classList.add("vanilla__placeholder-container")
    placeholderContainer.addEventListener("mouseenter", (e) => willTooltipOverflow(e, placeholderContainer))

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
    placeholder.setAttribute(
      "title",
      this.originalText
    );
    placeholder.setAttribute("contenteditable", "false");
    placeholder.innerHTML = `{{.${this.name}}}`;
    //create tooltip
    const tooltip = document.createElement("span")
    tooltip.setAttribute("class", "vanilla__placeholder-tooltip")
    tooltip.textContent = this.originalText
    tooltip.setAttribute("contenteditable", "false")

    //append placeholder and tooltip to container
    placeholderContainer.appendChild(placeholder)
    placeholderContainer.appendChild(tooltip)
    return placeholderContainer;
  }
}

export const $getPlaceholder = (
  placeholderId: string
): HTMLSpanElement | null => {
  return document.querySelector(
    `span.vanilla__placeholder-${placeholderId}`
  ) as HTMLSpanElement | null;
};

export const $getAllPlaceholders = (
  placeholderId: string
): NodeListOf<HTMLSpanElement> => {
  return document.querySelectorAll(
    `span.vanilla__placeholder-${placeholderId}`
  ) as NodeListOf<HTMLSpanElement>;
};

export const $placeholdify = (input: string): string => `{{.${input}}}`;

export const $undoPlaceholdify = (placeholderId: string): boolean => {
  // undo the placeholder creation
  const placeholders = $getAllPlaceholders(placeholderId);
  if (placeholders.length === 0) {
    return false;
  }
  placeholders.forEach((placeholder) => {
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
    placeholder.parentNode?.parentNode?.replaceChild(textNode, placeholder.parentNode);
  });
  return true;
};

export function $getPlaceholderOriginalText(
  placeholderId: string
): string | null {
  const placeholder = $getPlaceholder(placeholderId);
  if (!placeholder) {
    return null;
  }
  return placeholder.getAttribute("data-placeholder-original-text");
}

export function $isPlaceholderNameUnique(name: string): boolean {
  const placeholder = selectPlaceholderByName(store.getState(), name);
  return placeholder === undefined;
}

/**
 * @param id - id of the new placeholder
 * @param name - name of the new placeholder
 * @returns - true if the placeholder was successfully merged, false otherwise
 *
 * @description
 * This function merges the placeholder with the same name as the placeholder with the given id. The id of the new placeholder,
 * is ignored and the id of the existing placeholder is used.
 */
export function $mergePlaceholders(id: string, name: string) {
  const newPlaceholder = $getPlaceholder(id);
  if (!newPlaceholder) {
    return false;
  }
  const data = selectPlaceholderByName(store.getState(), name);
  if (!data) {
    return false;
  }
  const prevPlaceholder = $getPlaceholder(data.id);
  if (!prevPlaceholder) {
    return false;
  }
  const clone = prevPlaceholder.cloneNode(true) as HTMLSpanElement;
  newPlaceholder.parentNode?.replaceChild(clone, newPlaceholder);
  store.dispatch(incrementPlaceholderOccurrences(data.id));
  // update badge count
  const badge = document.querySelector(
    `span.vanilla__placheholder-count-badge-${data.id}`
  ) as HTMLSpanElement | null;
  if (badge) {
    // convert the innerText to a number and increment it by 1
    badge.innerText = `${Number(badge.innerText) + 1}`;
  }
}

function willTooltipOverflow(e: MouseEvent, el: HTMLSpanElement) {
  const container = document.querySelector(".vanilla__editor") as HTMLDivElement
  const tooltip = el.querySelector(".vanilla__placeholder-tooltip") as HTMLSpanElement;
  const isRightOverflow = (container?.offsetWidth - el.offsetLeft) < 250

  if (el.offsetTop > 120) return

  if (!isRightOverflow && tooltip && !tooltip.classList.contains("right")) {
    tooltip?.classList.remove("left");
    tooltip?.classList.add("right");
    tooltip.setAttribute("style", `--placeholder-width:${el.offsetWidth}px`)
  }

  if (isRightOverflow && tooltip && !tooltip.classList.contains("left")) {
    tooltip?.classList.remove("right");
    tooltip?.classList.add("left");
    tooltip.setAttribute("style", `--placeholder-width:${-el.offsetWidth}px`)
  }
}
