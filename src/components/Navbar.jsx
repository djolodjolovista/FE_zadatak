import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user ? (
            <div className="links-container">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className="text-link" to="/companies">
                  Companies
                </Link>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className="text-link" to="/drag-and-drop">
                  Drag And Drop
                </Link>
              </Typography>
              <Typography
                className="text-link"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <Link className="text-link" to="/show-more">
                  Show More
                </Link>
              </Typography>
            </div>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          )}

          {user && <Logout />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
