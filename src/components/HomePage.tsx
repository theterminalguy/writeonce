import { Link } from "react-router-dom";
import "./HomePage.css"
import {useEffect, useState, Dispatch, SetStateAction} from "react";
import jwt_decode from "jwt-decode";
import {signInAuth, signOutAuth} from "../store/features/auth/authSlice";
import { store } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {GoogleUserInterface, googleUserSlice} from "../store/features/googleUser/googleUserSlice"
import { RootState} from "../store";

export default function HomePage(props: {setLogIn: Dispatch<SetStateAction<boolean>>}): JSX.Element {
    const dispatch = useDispatch();
    const [user, setUser] = useState<GoogleUserInterface | null>(
        useSelector((state: RootState) => state.googleUser)
    );
    const [signIn, setSignIn] = useState<boolean>(
        store.getState()?.auth.signIn
    );
    const handleSignIn = (response: { status: { signed_in: boolean; }, credential: string; }) => {
        const userDetails = jwt_decode(response.credential) as GoogleUserInterface
        setUser(userDetails);

        const signInButton = document.getElementById("signInButton");
        if (signInButton) {
            signInButton.hidden = true;
        }

        setSignIn(true);
        store.dispatch(signInAuth())
        props.setLogIn(true)
        dispatch(googleUserSlice.actions.update(userDetails))
    }

    const handleSignOut = () => {
        setUser(null);

        const signInButton = document.getElementById("signInButton");
        if (signInButton) {
            signInButton.hidden = true;
        }
        setSignIn(false);
        store.dispatch(signOutAuth())
        props.setLogIn(false)
    }

    useEffect(() => {
        // global google
        window.addEventListener('sign-out', handleSignOut)
        if (!signIn) {
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
            <div id="signInButton" style={{width: "200px", margin: "20px", padding: "5px 10px"}}></div>
            {
                signIn &&
                <div>
                    <button onClick={handleSignOut} className={"signOut"}> Sign Out </button>
                    <div className={"user"}>
                        <h1>Write<span>Once</span></h1>
                        <div><img src={user?.picture} alt={user?.name}/></div>
                        <div>{user?.name}</div>
                        <div>{user?.email}</div>
                        <div className={"editor"}><Link to="/editor">Editor</Link></div>
                    </div>
                </div>
            }
        </div>
    );
}
