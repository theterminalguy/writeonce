import { Link } from "react-router-dom";
import "./HomePage.css"

export default function HomePage(): JSX.Element {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <Link to="/editor">Editor</Link>
      <Link to="/marketplace">Marketplace</Link>
    </div>
  );
}
