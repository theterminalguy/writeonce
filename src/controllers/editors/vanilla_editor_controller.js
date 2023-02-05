import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { setTemplateContent, setTemplateName } from "../../store/features/editor/editorSlice";
import { AppLogger } from '../../lib/logger';

export default class VanillaEditorController extends Controller {
  static targets = ["title", "content", "charCount"];

  static values = {
    maxChar: {
      type: Number,
      default: 35 // approximately 500 words
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
        const htmlWithinLimit = this.contentTarget.innerHTML.slice(0, this.maxCharValue);
        const plainTextWithinLimit = this.contentTarget.innerText.slice(0, this.maxCharValue);

        contentHTML = htmlWithinLimit
        contentText = plainTextWithinLimit

        // ge the tag surrounding the plain text
        const tagRegex = /<[^>]*>/g;
        const tags = htmlWithinLimit.match(tagRegex);
        this.logger.log('TAGS', tags);

        /**
         * the approach above is bad because we end up with a broken html
         * we need to find a way to slice the html to the end of the word
         * meaning we only slice valid html tags
         * 
         * this is a good start: https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454
         */


        /**
         * a clever way to solve this problem is to focus on the plain text
         * and then use the plain text to slice the html
         * 
         * - get the plain text within the limit
         * - find it's surrounding html tags
         * - slice the html to the end of the tags. If the plain text is in the middle of a tag, we need to close the tag or fix it
         * - append the redified html to the end of the html within the limit
         * 
         */

        // htmlBeyonndLimit select all the text over the limit, slice to end of word
        const htmlBeyondLimit = this.contentTarget.innerHTML.slice(this.maxCharValue, currentCharCount);
        this.logger.log('HTML', htmlWithinLimit);
        this.logger.log('TEXT', plainTextWithinLimit);
        // this.contentTarget.innerHTML = htmlWithinLimit + this.redifyFragment(htmlBeyondLimit);
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
