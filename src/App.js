import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Product from "./Pages/Product/Product.js";
import Navbar from "./Components/NavBar/Navbar";
import { useState } from "react";
import Auth from "./Pages/Auth/Auth";
import AddCategory from "./Pages/AddCategory/AddCategory";
import HomeFront from "./Pages/HomeFront/HomeFront";
import AboutFront from "./Pages/AboutFront/AboutFront";
import ContactFront from "./Pages/ContactFront/ContactFront";

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
          <Route path="/ajout-categorie" component={AddCategory} />
          <Route path="/home-data" component={HomeFront} />
          <Route path="/about-data" component={AboutFront} />
          <Route path="/contact-data" component={ContactFront} />
        </Switch>
      </Router> : <Auth signin={setIsSignIn} />}
    </>
  );
}

export default App;
