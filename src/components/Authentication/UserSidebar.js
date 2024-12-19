import React from 'react';
import { numberWithCommas } from '../CoinsTable';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar, TableBody } from '@material-ui/core';
import { auth, db } from "../../firebase";
import { signOut } from 'firebase/auth';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

import {  TableCell} from "@material-ui/core";





const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "rgb(118 242 255)",
    marginTop: 20,
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "rgb(118 242 255)",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(118 242 255)",
    boxShadow: "0 0 3px black",
  },

});



export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({

    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed Successfull !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
    toggleDrawer();
  };


  return (
    <div>
      {['right',].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "rgb(118 242 255)",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}

          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>


            <div className={classes.container}>

              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>

                <div className={classes.watchlist} >
                  <span style={{
                    fontSize: 15,
                    // border:"2px solid red",
                    textShadow: "0 0 5px black"
                  }}>
                    Watchlist
                  </span>
                  <table>
                    <TableBody>
                      
                        {coins.map(coin => {
                          if (watchlist.includes(coin.id))
                      
                      return (
                      <div className='classes.coin'>
                        <TableCell><span>{coin.name}</span></TableCell>
                        <TableCell><span style={{ display: "flex", gap: 8 }}>
                          {symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete style={{ cursor: "pointer" }} fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span></TableCell>


                      </div>
                      );
                      else return <></>
                    })}
                    </TableBody>
                  </table>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
