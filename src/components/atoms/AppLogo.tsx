// import { IconContext } from "react-icons";
// import { FcDocument } from "react-icons/fc";
import logo from "../../assets/logo.svg";

const AppLogo = () => {
  return (
    // <IconContext.Provider value={{ size: "50px" }}>
    //   <FcDocument />
    // </IconContext.Provider>
    <img src={logo} alt="WriteOnce" width="38px" height="42px" />
  );
};

export default AppLogo;
