
import { Link } from "react-router-dom";
import "./index.css";


export default function Menu(): JSX.Element {

    return (
        <div className={"menu"}>
            <div className={"menu__logo"}> Writeonce </div>
            <Link to="/editor" className={"menu__link"}>Editor</Link>
            <Link to="/marketplace" className={"menu__link"}>Marketplace</Link>
        </div>
    );
}
