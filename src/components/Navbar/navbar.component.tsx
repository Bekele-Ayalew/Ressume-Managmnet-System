import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import {Box} from "@mui/material";

const links = [
  { href: "/", Label: "Home" },
  { href: "/companies", Label: "Companies" },
  { href: "/candidates", Label: "Candidates" },
  { href: "/jobs", Label: "Jobs" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <div className="brand">
      <img src="/logo.png" alt="Company Logo" className="logo" />
        <span>   <Box
        component="h3"
        sx={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Berhan Job Portal System
      </Box></span>
      </div>
      <div className={`menu ${open ? "open" : ""}`}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.Label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger" onClick={ToggleOpenMenu}>
        <Menu />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
