import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
const Logo = `${process.env.PUBLIC_URL}/icons/clinicLogo.svg`;

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div></div>{" "}
        {/* This empty div is used to balance the space on the left side of the logo */}
        <img
          src={Logo}
          alt="Logo"
          style={{
            height: 50,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div>
          <Button variant="outlined" size="medium" sx={{ ml: 2, mr: 2 }}>
            <RouterLink
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign up
            </RouterLink>
          </Button>
          <Button variant="contained" size="medium" sx={{ ml: 2, mr: 2 }}>
            <RouterLink
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </RouterLink>
          </Button>
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
