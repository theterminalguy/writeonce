import { ChevronIcon } from "@mantine/core";
import AppName from "../../atoms/app-name";
import "./Navbar.css";
import { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IconContext } from "react-icons";

const Navbar = () => {
  const isDesktop = window.innerWidth > 900;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="vanilla__homepage__navbar__container">
      <AppName withLogo />

      {/* Show hamburger menu if not desktop */}
      {!isDesktop ? (
        <IconContext.Provider value={{ size: "50px" }}>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <CgMenuLeftAlt />
          </div>
        </IconContext.Provider>
      ) : null}

      {isDesktop || isMenuOpen ? (
        <div className="vanilla__homepage__navbar__links">
          <div className="vanilla__homepage__navbar__link__item">Sign in</div>
          <div className="vanilla__homepage__navbar__link__item">
            Use Case Solutions <ChevronIcon fill="#222222" />
          </div>
          <div className="vanilla__homepage__navbar__link__item">Pricing</div>
          <button className="vanilla__homepage__navbar__button">
            Download
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
