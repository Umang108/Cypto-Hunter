import { AppBar, Select, MenuItem, Toolbar, Typography, } from '@material-ui/core'

import React from 'react'
import logo from './clogo.png'
import { createTheme, makeStyles, ThemeProvider, } from '@material-ui/core/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';




//import HomePage from '../Pages/HomePage';


const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <container>
            <Toolbar>
              <img src={logo} alt="logo"
                style={{ width: 57, height: 50, marginleft: 11, margintop: 11 }} />

              <Typography onClick={() => navigate(`/`)}
                variant="h6"
                className={classes.title}></Typography>

              <NavLink to="/CoinsTable" id='Coin' style={{
                border: "2px solid #adf7e5",
                borderRadius: 6,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: "Montserrat",
                cursor: "pointer",
                margin:10,
                color:"pink",
                fontWeight:15,
                '&:hover': {
                  backgroundColor: "#adf7e5",
                  color: "black",
                }
                }
                }

               > Coin table </NavLink>
            <NavLink to="/" style={{
                border: "2px solid #adf7e5",
                borderRadius: 6,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: "Montserrat",
                cursor: "pointer",
                // margin:10,
                color:"pink",
                fontWeight:15,
                '&:hover': {
                  backgroundColor: "#adf7e5",
                  color: "black",
                }
                }
                }>Home</NavLink>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"

              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>


              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>

            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>

        </container>

      </AppBar>
    </ThemeProvider >
    </>
  )
}

export default Header





