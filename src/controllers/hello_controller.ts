import { Controller } from "@hotwired/stimulus";
import { AppLogger } from "../lib/logger";

export default class HelloController extends Controller {
  logger = new AppLogger("HelloController");

  onYes() {
    this.logger.info("Yes");
  }
  onNo() {
    this.logger.info("No");
  }
}
