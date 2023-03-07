import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { updateTemplate } from "../../store/features/editor/editorSlice";
import { AppLogger } from "../../lib/logger";
import { generate } from "shortid";

const logger = new AppLogger("VanillaEditorController");

export default class VanillaEditorController extends Controller {
  static targets = ["title", "content", "charCount"];

  static values = {
    maxChar: {
      type: Number,
      default: 1500, // approx 300 words
    },
    templateId: {
      type: String,
      default: "",
    },
  };

  declare maxCharValue: number;
  declare templateIdValue: string;

  declare readonly titleTarget: HTMLHeadingElement;
  declare readonly contentTarget: HTMLDivElement;
  declare readonly charCountTarget: HTMLSpanElement;

  uniqueId = generate();

  connect() {
    this.contentTarget.focus();
    this.charCountTarget.innerText = `0/${this.maxCharValue} characters`;
    this.charCountTarget.title = `approximately ${this.charCountToWordCount(
      this.maxCharValue
    )} words`;
  }

  charCountToWordCount(charCount: number) {
    // source: https://charactercounter.com/characters-to-words
    const averageCharsPerWord = 5;
    return Math.round(charCount / averageCharsPerWord);
  }

  appendLimitDivider(node: ChildNode) {
    logger.info("appendLimitDivider", node);
    const divider = document.querySelector(".limit-divider");
    if (divider) {
      divider.remove();
    }
    const redSpan = document.createElement("span");
    redSpan.className = "limit-divider";
    redSpan.style.width = "100%";
    redSpan.style.display = "block";
    redSpan.style.border = "1px solid red";
    redSpan.style.color = "red";
    redSpan.style.padding = "2px";
    redSpan.style.marginTop = "10px";
    redSpan.innerText = "content beyond this point will not be saved";

    // see https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentElement
    // TODO: currently, this is nesting span elements
    // we want to be sure that the HTML generated is syntactically correct
    // we should look into how this affects the HTML generated when needed to convert to PDF, XML, etc.
    (node as HTMLElement).insertAdjacentElement("beforeend", redSpan);
  }

  handleFocusOut(event: FocusEvent) {
    if (event.target === this.titleTarget) {
      const tempName = String(this.titleTarget.innerText).trim();
      store.dispatch(
        updateTemplate({
          id: this.templateIdValue,
          templateName: tempName,
        })
      );
    }

    if (event.target === this.contentTarget) {
      let contentText = this.contentTarget.innerText;
      let contentHTML = this.contentTarget.innerHTML;

      const currentCharCount = this.contentTarget.innerText.length;

      // TODO: we should format the overflow text in red
      this.charCountTarget.innerText = `${currentCharCount}/${this.maxCharValue} characters`;

      if (currentCharCount > this.maxCharValue) {
        // the goal is to split the text into two fragments without loosing the formatting
        // the first fragment is what we we will save in the redux store
        // the second fragment will be surrounded by a red div and will be appended to the end of the text

        // go through exactly maxCharValue characters
        // when we are at the last character, we keep track of the next node

        const textWithinMaxChar = contentText.slice(0, this.maxCharValue);

        let nodeCharCount = 0;
        let currentNode = this.contentTarget.firstChild;
        let prevNode = null;

        // see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
        const firstFragment = new DocumentFragment();

        // we loop through the nodes until we reach the maxCharValue
        // this way, we know exactly which node to split
        while (currentNode && nodeCharCount < this.maxCharValue) {
          if (!currentNode.textContent) return;
          firstFragment.appendChild(currentNode.cloneNode(true));
          nodeCharCount += currentNode.textContent.length;
          prevNode = currentNode;
          currentNode = currentNode.nextSibling;
        }

        // remainingText is the text that will be appended to the end of the text
        if (!firstFragment.lastChild || !firstFragment.lastChild.textContent) {
          logger.error("fragment lastChild not found");
          return;
        }
        const remainingText = firstFragment.lastChild.textContent.slice(
          textWithinMaxChar.length
        );

        // we check if the last node contains the textWithinMaxChar
        // if it does, we remove the text that is beyond the maxCharValue
        if (firstFragment.lastChild.textContent.includes(textWithinMaxChar)) {
          firstFragment.lastChild.textContent =
            firstFragment.lastChild.textContent.slice(0, this.maxCharValue);
        }
        const firstFragmentDiv = document.createElement("div");
        firstFragmentDiv.appendChild(firstFragment);
        contentHTML = firstFragmentDiv.outerHTML;
        contentText = firstFragmentDiv.innerText;

        if (
          !prevNode ||
          !prevNode.lastChild ||
          !prevNode.parentNode ||
          !prevNode.textContent ||
          !prevNode.lastChild.textContent
        ) {
          logger.error("Error occurred in prevNode");
          return;
        }

        if (currentNode === null) {
          // we are at the end of the text
          // let's split the prevNode into two nodes
          // one will have the first part of the text
          // the other will have the rest of the text
          if (prevNode.lastChild.textContent.includes(textWithinMaxChar)) {
            const newNode = prevNode.cloneNode(true);
            newNode.textContent = remainingText;
            prevNode.textContent = prevNode.textContent.slice(
              0,
              textWithinMaxChar.length
            );
            this.appendLimitDivider(prevNode);
            prevNode.parentNode.insertBefore(newNode, prevNode.nextSibling);
          } else {
            this.appendLimitDivider(prevNode);
          }
        } else {
          if (
            !currentNode.lastChild ||
            !currentNode.textContent ||
            !currentNode.lastChild.textContent
          ) {
            logger.error("Error occurred in currentNode");
            return;
          }

          if (prevNode.lastChild.textContent.includes(textWithinMaxChar)) {
            const newNode = prevNode.cloneNode(true);
            newNode.textContent = remainingText;
            prevNode.textContent = prevNode.textContent.slice(
              0,
              textWithinMaxChar.length
            );

            this.appendLimitDivider(prevNode);

            prevNode.parentNode.insertBefore(newNode, prevNode.nextSibling);
          } else if (
            currentNode.lastChild.textContent.includes(textWithinMaxChar)
          ) {
            const newNode = currentNode.cloneNode(true);
            newNode.textContent = remainingText;
            currentNode.textContent = currentNode.textContent.slice(
              0,
              textWithinMaxChar.length
            );
            this.appendLimitDivider(currentNode);
          } else {
            // just append the limit divider
            this.appendLimitDivider(prevNode);
          }
        }
      }
      /**
       * TODO:
       * 1. We should wrap the contentHTML in a div if it isn't. We currently do this when the text goes over the limit
       * 2. We should use a library like DOMPurify (https://github.com/cure53/DOMPurify) to sanitize the HTML in order to prevent XSS attacks
       * 3. We should benchmark some of the operations in this controller just to improve the experience of the user
       * 4. We should look into how this affects the HTML generated when needed to convert to PDF, XML, etc.
       */
      store.dispatch(
        updateTemplate({
          id: this.templateIdValue,
          contentText: contentText,
          contentHTML: contentHTML,
          updated_at: new Date().toUTCString(),
        })
      );
    }
  }
}
