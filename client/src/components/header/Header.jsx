
import { AppBar, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";


const cmp1 = {
    background: "#FFFFFF",
    color: "#000",
}


const cont = {
    justifyContent: "center",
    "& > a": {
      padding: "20px",
      textDecoration: "none",
      color: "#000"
    },
  };
  

const Header = () => {
    return (
        <AppBar sx={cmp1}>
            <Toolbar sx={cont}>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Logout</Link>
                {/* <Typography>Home</Typography> */}
            </Toolbar>
        </AppBar>
    )
};

export default Header;