
import { AppBar, Toolbar, Typography } from "@mui/material";


const cmp1 = {
    background: "#FFFFFF",
    color: "#000",
}


const cont = {
    justifyContent: "center",
    "& > p": {
      padding: "20px",
    },
  };
  

const Header = () => {
    return (
        <AppBar sx={cmp1}>
            <Toolbar sx={cont}>
                <Typography>Home</Typography>
                <Typography>About</Typography>
                <Typography>Contact</Typography>
                <Typography>Logout</Typography>
                {/* <Typography>Home</Typography> */}
            </Toolbar>
        </AppBar>
    )
};

export default Header;