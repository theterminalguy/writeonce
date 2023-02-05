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

        const textWithinMaxChar = contentText.slice(0, this.maxCharValue);

        let nodeCharCount = 0;
        let currentNode = this.contentTarget.firstChild;
        let prevNode = null;
        let firstFragment = new DocumentFragment();

        while (currentNode && nodeCharCount < this.maxCharValue) {
          firstFragment.appendChild(currentNode.cloneNode(true));
          nodeCharCount += currentNode.textContent.length;
          prevNode = currentNode;
          currentNode = currentNode.nextSibling;
        }

       
        let remainingText = firstFragment.lastChild.textContent.slice(textWithinMaxChar.length);
        if (firstFragment.lastChild.textContent.includes(textWithinMaxChar)) {
          firstFragment.lastChild.textContent = firstFragment.lastChild.textContent.slice(0, textWithinMaxChar.length);
        }
        // const newDoc = new DOMParser().parseFromString(firstFragment.innerHTML, "text/html");
        const firstFragmentDiv = document.createElement('div');
        firstFragmentDiv.appendChild(firstFragment);
        contentHTML = firstFragmentDiv.outerHTML;
        contentText = firstFragmentDiv.innerText;

      
        this.logger.log('prevNode', prevNode);
        // currentNode is null when we are at the end of the text and there is no more text.
        // Usually a single element wraps all the text
        this.logger.log('currentNode', currentNode); 
        this.logger.log('remainingText', remainingText);


        // const lastNode = currentNode || prevNode;
        if (currentNode === null) {
          // we are at the end of the text
          // let's split the prevNode into two nodes
          // one will have the first part of the text
          // the other will have the rest of the text
          this.logger.log('got here lastNode', textWithinMaxChar);
          if (prevNode.lastChild.textContent.includes(textWithinMaxChar)) {
            const newNode = prevNode.cloneNode(true);
            newNode.textContent = remainingText;
            prevNode.textContent = prevNode.textContent.slice(0, textWithinMaxChar.length);
            // create a horizontal span in red color that seprarates the two fragments
            const redSpan = document.createElement('span');
            redSpan.stylewidth = '100%';
            redSpan.style.display = 'block';
            redSpan.style.border = '1px solid red';
            redSpan.style.color = 'red';
            redSpan.style.padding = '2px';
            redSpan.style.marginTop = '10px';
            redSpan.innerText = 'content beyond this point will not be saved';
            
            prevNode.insertAdjacentElement('beforeend', redSpan);
            prevNode.parentNode.insertBefore(newNode, prevNode.nextSibling);
          }
        }


        // this.logger.log('newDoc', newDoc);


        // in the current node, find the textWithinMaxChar and delete everything after it
        // prevNode.textContent = prevNode.textContent.slice(0, textWithinMaxChar.length);
        // let firstFragment = new DocumentFragment();
        // let's split the html into two fragments
        // the first fragment will be what we save in the redux store
        // the second fragment will be what we append to the end of the text

        // rest of the nodes
        // let restOfNodes = currentNode;
        // let secondFragment = new DocumentFragment();
        // while (restOfNodes) {
        //   secondFragment.appendChild(restOfNodes.cloneNode(true));
        //   this.logger.log('restOfNodes', restOfNodes);
        //   restOfNodes = restOfNodes.nextSibling;
        // }
        /*const secondFragmentDiv = document.createElement('div');
        secondFragmentDiv.appendChild(secondFragment);
        this.contentTarget.innerHTML = contentHTML + this.redifyFragment(secondFragmentDiv.innerHTML);*/
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
