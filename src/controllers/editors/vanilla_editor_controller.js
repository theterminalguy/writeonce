import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { setTemplateContent, setTemplateName } from "../../store/features/editor/editorSlice";
import { AppLogger } from '../../lib/logger';

export default class VanillaEditorController extends Controller {
  static targets = ["title", "content", "charCount"];

  static values = {
    maxChar: {
      type: Number,
      default: 35 // approx 300 words
    }
  };

  connect() {
    this.contentTarget.focus();
    this.charCountTarget.innerText = `0/${this.maxCharValue} characters`;
    this.charCountTarget.title = `approximately ${this.charCountToWordCount(this.maxCharValue)} words`;
    this.logger = new AppLogger('VanillaEditorController');
  }

  charCountToWordCount(charCount) {
    // source: https://charactercounter.com/characters-to-words
    const averageCharsPerWord = 5;
    return Math.round(charCount / averageCharsPerWord);
  }

  redifyFragment(fragment) {
    return ` <div style="color: red; display: inline-block">${fragment}</div>`;
  }

  handleFocusOut(event) {
    if (event.target === this.titleTarget) {
      store.dispatch(
        setTemplateName(
          this.titleTarget.innerText
        )
      )
    }

    if (event.target === this.contentTarget) {
      let contentText = this.contentTarget.innerText;
      let contentHTML = this.contentTarget.innerHTML;

      const currentCharCount = this.contentTarget.innerText.length;
      this.charCountTarget.innerText = `${currentCharCount}/${this.maxCharValue} characters`;

      if (currentCharCount > this.maxCharValue) {
        // the goal is to split the text into two fragments without loosing the formatting
        // the first fragment is what we we will save in the redux store
        // the second fragment will be surrounded by a red div and will be appended to the end of the text

        // go through exactly maxCharValue characters
        // when we are at the last character, we keep track of the next node

        let nodeCharCount = 0;
        // let nextNode = null;
        let prevNode = null;
        let currentNode = this.contentTarget.firstChild;

        while (currentNode && nodeCharCount < this.maxCharValue) {
          nodeCharCount += currentNode.textContent.length;
          prevNode = currentNode;
          currentNode = currentNode.nextSibling;
        }

        this.logger.log('currentNode', currentNode);
        this.logger.log('prevNode', prevNode);

      }
      store.dispatch(
        setTemplateContent({
          contentText,
          contentHTML
        })
      )
    }
  }
}
