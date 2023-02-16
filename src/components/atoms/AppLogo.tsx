import { IconContext } from "react-icons";
import { FcDocument } from "react-icons/fc";

const AppLogo = () => {
  return (
    <IconContext.Provider value={{ size: "50px" }}>
      <FcDocument />
    </IconContext.Provider>
  );
};

export default AppLogo;
