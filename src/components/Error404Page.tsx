import { Link } from "react-router-dom";

import "./Error404Page.css";

export default function Error404Page() {
  return (
    <div className="error-404-page">
      <h1>Page Not Found </h1>
      <p>Here's a short poem for the one who wanders:</p>
      <blockquote>
        You've traveled far and you've traveled wide Searching around, you've
        desperately tried To find what you seek, no matter the cost I'm sorry to
        say — it looks like you're lost
      </blockquote>
        <p>
        Why not head on back to the <Link to="/">homepage</Link>
        </p>
    </div>
  );
}
