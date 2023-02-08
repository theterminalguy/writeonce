import { Link } from "react-router-dom";
import "./HomePage.css"
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

interface userInterface {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
    jti: string;
    nbf: number;

}
export default function HomePage(): JSX.Element {
    const [user, setUser] = useState<userInterface | null>(null);
    const [signIn, setSignin] = useState<boolean>(false);
    const handleSignIn = (response: { status: { signed_in: boolean; }, credential: string; }) => {
        console.log("User is signed in", response);
        setUser(jwt_decode(response.credential));

        const signInButton = document.getElementById("signInButton");
        if (signInButton) {
            signInButton.hidden = true;
        }
        setSignin(true);
    }

    const handleSignOut = () => {
        // global google
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        google.accounts.id.disableAutoSelect();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        google.accounts.id.revoke();
        setUser(null);

        const signInButton = document.getElementById("signInButton");
        if (signInButton) {
            signInButton.hidden = true;
        }
        setSignin(false);
    }

    useEffect(() => {
        // global google
        if (!user) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: "655257869747-6hrcoh04iot27ooe2i9oeju12hvq56q9.apps.googleusercontent.com",
                callback: handleSignIn,
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            google.accounts.id.prompt();
            const signInButton = document.getElementById("signInButton");
            if (signInButton) {
                signInButton.hidden = false;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            google.accounts.id.renderButton(
                document.getElementById("signInButton"),
                { theme: "outline", size: "large" }
            );
        }
    }, [signIn] );
    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <div id="signInButton" style={{width: "200px"}}></div>
            {
                user &&
                <div>
                    <div><button onClick={handleSignOut}> Sign Out </button></div>
                    <div>{user.email}</div>
                    <div><Link to="/editor">Editor</Link></div>
                    <div><Link to="/marketplace">Marketplace</Link></div>
                </div>
            }
        </div>
    );
}
