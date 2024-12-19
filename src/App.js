import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinsTable from './components/CoinsTable';
import './App.css';
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import Alert from './components/Alert'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#190944 ",
    color: "#b3b3b3",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />

          <Routes>
            {/*<Route   path='/' element={< Header />}></Route>*/}
            <Route exact path='/' element={< HomePage />}></Route>
            <Route exact path='/coins/:id' element={< CoinPage />}></Route>
            <Route exact path='/Coinstable' element={< CoinsTable />}></Route>
          </Routes>
        </div>
        <Alert />
      </BrowserRouter>
    </>

  );
}

export default App;