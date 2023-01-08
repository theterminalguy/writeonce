import { Link } from "react-router-dom";

import "./Error404Page.css";

export default function Error404Page() {
  return (
    <div className="error-404-page">
      <h1>Page Not Found </h1>
      <p>For the one who wanders:</p>
      <blockquote>
        I think you travel to search and you come back home to find yourself there.
      </blockquote>
        <p><cite>-- Chiamanda Ngozi Adichie</cite></p>
        <p>
        <Link to="/">Take me home</Link>
        </p>
    </div>
  );
}
