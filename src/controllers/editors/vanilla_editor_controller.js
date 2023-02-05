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
      let contentHTML = this.contentTarget.outerHTML;

      const currentCharCount = this.contentTarget.innerText.length;
      this.charCountTarget.innerText = `${currentCharCount}/${this.maxCharValue} characters`;

      if (currentCharCount > this.maxCharValue) {
        // the goal is to split the text into two fragments without loosing the formatting
        // the first fragment is what we we will save in the redux store
        // the second fragment will be surrounded by a red div and will be appended to the end of the text

        // go through exactly maxCharValue characters
        // when we are at the last character, we keep track of the next node

        const textWithinMaxChar = contentText.slice(0, this.maxCharValue);

        let nodeCharCount = 0;
        // let nextNode = null;
        let prevNode = null;
        let currentNode = this.contentTarget.firstChild;

        let firstFragment = new DocumentFragment();

        while (currentNode && nodeCharCount < this.maxCharValue) {
          firstFragment.appendChild(currentNode.cloneNode(true));
          nodeCharCount += currentNode.textContent.length;
          prevNode = currentNode;
          currentNode = currentNode.nextSibling;
        }
        firstFragment.lastChild.textContent = firstFragment.lastChild.textContent.slice(0, textWithinMaxChar.length);
        // const newDoc = new DOMParser().parseFromString(firstFragment.innerHTML, "text/html");
        const firstFragmentDiv = document.createElement('div');
        firstFragmentDiv.appendChild(firstFragment);
        contentHTML = firstFragmentDiv.outerHTML;
        contentText = firstFragment.textContent;

        // this.logger.log('newDoc', newDoc);


        // in the current node, find the textWithinMaxChar and delete everything after it
        // prevNode.textContent = prevNode.textContent.slice(0, textWithinMaxChar.length);
        // let firstFragment = new DocumentFragment();
        // let's split the html into two fragments
        // the first fragment will be what we save in the redux store
        // the second fragment will be what we append to the end of the text

        // rest of the nodes
        let restOfNodes = currentNode;
        let secondFragment = new DocumentFragment();
        while (restOfNodes) {
          secondFragment.appendChild(restOfNodes.cloneNode(true));
          this.logger.log('restOfNodes', restOfNodes);
          restOfNodes = restOfNodes.nextSibling;
        }
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
