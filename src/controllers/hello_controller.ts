import { Controller } from "@hotwired/stimulus";
import { AppLogger } from "../lib/logger";

const logger = new AppLogger("HelloController");
export default class HelloController extends Controller {
  onYes() {
    logger.info("Yes");
  }
  onNo() {
    logger.info("No");
  }
}
