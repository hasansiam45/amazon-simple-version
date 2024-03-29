import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './components/NoMatch/NoMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
      <h2>Email: {loggedInUser.email}</h2>
      <Router>
      <Header></Header>

        <Switch>

          <Route path="/shop">
             <Shop></Shop>
          </Route>

          <Route path="/review">
             <Review></Review>
          </Route>

          <PrivateRoute path="/manage">
             <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/login">
             <Login></Login>
          </Route>

          <PrivateRoute path="/shipment">
             <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path="/">
             <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
             <ProductDetails></ProductDetails>
          </Route>

          <Route path="*">

            <NoMatch></NoMatch>

          </Route>

        </Switch>

      </Router>


      

      <Footer></Footer>
    </UserContext.Provider>
  );
}

export default App;
