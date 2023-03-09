import { Link } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import jwt_decode from "jwt-decode";
import { signInAuth, signOutAuth } from "../store/features/auth/authSlice";
import { store } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleUserInterface,
  googleUserSlice,
} from "../store/features/googleUser/googleUserSlice";
import { RootState } from "../store";
import Navbar from "./UI/Homepage/Navbar";
import EarlyAccessForm from "./UI/Homepage/EarlyAccessForm";
import googleIcon from "../assets/Google.svg";
import microsoftIcon from "../assets/Microsoft.svg";
import slackIcon from "../assets/Slack.svg";
import usecaseImage from "../assets/Usecases.svg";
import templateImage from "../assets/Mask group.svg";
import Footer from "./UI/Homepage/Footer";

export default function HomePageContainer(props: {
  setLogIn: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();
  const [user, setUser] = useState<GoogleUserInterface | null>(
    useSelector((state: RootState) => state.googleUser)
  );
  const [signIn, setSignIn] = useState<boolean>(store.getState()?.auth.signIn);
  const handleSignIn = (response: {
    status: { signed_in: boolean };
    credential: string;
  }) => {
    const userDetails = jwt_decode(response.credential) as GoogleUserInterface;
    setUser(userDetails);

    const signInButton = document.getElementById("signInButton");
    if (signInButton) {
      signInButton.hidden = true;
    }

    setSignIn(true);
    store.dispatch(signInAuth());
    props.setLogIn(true);
    dispatch(googleUserSlice.actions.update(userDetails));
  };

  const handleSignOut = () => {
    setUser(null);

    const signInButton = document.getElementById("signInButton");
    if (signInButton) {
      signInButton.hidden = true;
    }
    setSignIn(false);
    store.dispatch(signOutAuth());
    props.setLogIn(false);
  };

  useEffect(() => {
    // global google
    window.addEventListener("sign-out", handleSignOut);
    if (!signIn) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          "655257869747-6hrcoh04iot27ooe2i9oeju12hvq56q9.apps.googleusercontent.com",
        callback: handleSignIn,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.prompt();
      const signInButton = document.getElementById("signInButton");
      if (signInButton) {
        signInButton.hidden = false;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.renderButton(document.getElementById("signInButton"), {
        theme: "outline",
        size: "large",
      });
    }
  }, [signIn]);

  return (
    <div className="home-page">
      {/* <div
        id="signInButton"
        style={{ width: "200px", margin: "20px", padding: "5px 10px" }}
      ></div> */}
      <div className="homepage__hero__section">
        <Navbar />
        <div>
          <div className="homepage__waitlist__chip">
            🏅 We are rolling out a beta-version soon. Join the waitlist
          </div>
          <EarlyAccessForm />
        </div>
      </div>

      <div className="homepage__trusted__agencies">
        <h1>Trusted by many Agencies</h1>
        <p>Document and text automation software to streamline your business</p>
        <div className="homepage__trusted__agencies__collection">
          <img src={googleIcon} alt="Google" />
          <img src={slackIcon} alt="Slack" />
          <img src={microsoftIcon} alt="Microsoft" />
        </div>
        <div className="homepage__usecases__heading">
          <h1>Use Case Solutions</h1>
          <p>
            Document and text automation software to streamline your business
          </p>
        </div>
      </div>
      <div className="homepage__usecases__section">
        <div>
          <div className="homepage__usecases__text__section">
            <div className="homepage__usecases__text__container">
              <h2>
                <span>Send out HR</span>
                <span> Smart Contracts</span>
              </h2>
              <p>
                Underwriters love to see their feedback addressed. The recent
                effects of disposable income on the equity market are pretty
                alarming Underwriters love to see
              </p>
              <ul>
                <li>Underwriters love to see their feedback addressed.</li>
                <li>The recent effects of disposable income on the equity.</li>
                <li>Market are pretty alarming Underwriters love to see.</li>
              </ul>
            </div>
            <div className="homepage__usecases__text__container">
              <h2>Organize your Docs and Mails</h2>
            </div>
            <div className="homepage__usecases__text__container">
              <h2>Send Multiple Mails at Once</h2>
            </div>
            <div className="homepage__usecases__text__container">
              <h2>Share Your Template Through Existing Apps</h2>
            </div>
          </div>
          <div className="homepage__usecases__image__container">
            <img src={usecaseImage} alt="Usecases" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="homepage__contact__section">
        <div className="homepage__contact__text__section">
          <h2>
            Have a use case to share? <span>Let us know...</span>
          </h2>
          <p>
            At the heart of Slack are channels: organized spaces for everyone
            and everything you need for work.
          </p>
          <button>Contact Us</button>
        </div>
        <div className="homepage__contact__image__section">
          <img src={templateImage} alt="Template" loading="lazy" />
        </div>
      </div>

      <Footer />

      {signIn && (
        <div>
          <button onClick={handleSignOut} className={"signOut"}>
            {" "}
            Sign Out{" "}
          </button>
          <div className={"user"}>
            <h1>
              Write<span>Once</span>
            </h1>
            <div>
              <img src={user?.picture} alt={user?.name} />
            </div>
            <div>{user?.name}</div>
            <div>{user?.email}</div>
            <div className={"editor"}>
              <Link to="/editor">Editor</Link>
            </div>
            <div className={"editor"}>
              <Link to="/templates">Templates</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
