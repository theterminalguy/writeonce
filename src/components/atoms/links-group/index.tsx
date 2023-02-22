import {
  UnstyledButton,
  Group,
  Box,
  ThemeIcon,
  ChevronIcon,
  Collapse,
} from "@mantine/core";
import { ElementType, useState } from "react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import "./index.css";

export interface LinksGroupProps {
  icon: ElementType;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const LinksGroup = ({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      className={({ isActive }) =>
        `vanilla__link__navlink__item ${isActive ? "active" : ""}`
      }
      to={link.link}
      key={link.label}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className="vanilla__link__button"
      >
        <Group position="apart" spacing={0}>
          <Box
            className="vanilla__link__section__label__container"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ThemeIcon variant="light" size={30}>
              <IconContext.Provider value={{ size: "18px", className: "" }}>
                <Icon />
              </IconContext.Provider>
            </ThemeIcon>
            <Box ml="md" className="vanilla__link__section__label">
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className=""
              stroke="1.5"
              style={{
                transform: opened ? `rotate(-90deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          <div className="vanilla__link__navlink__collapse">{items}</div>
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
