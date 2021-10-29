import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Product from "./Pages/Product/Product.js";
import Navbar from "./Components/NavBar/Navbar";
import { useEffect, useState } from "react";
import Auth from "./Pages/Auth/Auth";

function App() {
  const [isSignIn, setIsSignIn] = useState(false);




  return (
    <>
      {isSignIn ? 
      <Router>
        <Navbar setIsSignIn={setIsSignIn}/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ajout-produit" exact component={AddProduct} />
          <Route path="/produit/:slug" component={Product} />
        </Switch>
      </Router> : <Auth signin={setIsSignIn} />}
    </>
  );
}

export default App;
