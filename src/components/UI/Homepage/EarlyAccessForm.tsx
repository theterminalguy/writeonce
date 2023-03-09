import "./EarlyAccessForm.css";
import frame1 from "../../../assets/Frame (1).svg";
import frame2 from "../../../assets/Frame (2).svg";
import frame3 from "../../../assets/Frame (3).svg";

const EarlyAccessForm = () => {
  return (
    <div className="early__access__form__container">
      <img src={frame1} id="frame1" alt="" />
      <img src={frame2} id="frame2" alt="" />
      <img src={frame3} id="frame3" alt="" />
      <div className="early__access__form">
        <h1>Get Early Access</h1>
        <p>Document and text automation software to streamline your business</p>
        <input type="text" placeholder="Let's know your name" />
        <input type="text" placeholder="Enter your email address" />
        <button>Join Waitlist</button>
        <span>
          <input type="checkbox" name="access" id="access" />
          <label htmlFor="access">I'd love access to the alpha release.</label>
        </span>
      </div>

      <div className="early__access__video__container">
        <div className="early__access__video">
          <span>
            <span></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessForm;
