
import { Link } from "react-router-dom";
import "./index.css";


export default function Menu(): JSX.Element {

    const handleSignOut = () => {
        window.dispatchEvent(new Event("sign-out"));
    }
    return (
        <div className={"vanilla__menu"}>
            <div className={"vanilla__menu__logo"}> Writeonce </div>
            <Link to="/" className={"vanilla__menu__link"}>Home</Link>
            <Link to="/editor" className={"vanilla__menu__link"}>Editor</Link>
            <Link to="/marketplace" className={"vanilla__menu__link"}>Marketplace</Link>
            <button onClick={handleSignOut} className={"signOut"}> Sign Out </button>
        </div>
    );
}
