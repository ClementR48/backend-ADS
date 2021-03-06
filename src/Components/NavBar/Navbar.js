import React from "react";
import "./Navbar.css";
import { auth } from "../../utils/firebaseConfig";
import { NavLink } from "react-router-dom";
import { signOut } from "@firebase/auth";

const Navbar = ({setIsSignIn}) => {
  
  const logout = async () => {
    await signOut(auth);
    await setIsSignIn(false)

  };
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <NavLink to="/" activeClassName="navlink-active" exact>
          <li>Liste des Produits</li>
        </NavLink>
        <NavLink activeClassName="navlink-active" to="/ajout-produit" exact>
          <li>Ajout d'un Produit</li>
        </NavLink>
        <NavLink activeClassName="navlink-active" to="/ajout-categorie" exact>
          <li>Categorie</li>
        </NavLink>
        <NavLink activeClassName="navlink-active" to="/home-data" exact>
          <li>Home</li>
        </NavLink>
        <NavLink activeClassName="navlink-active" to="/about-data" exact>
          <li>A propos</li>
        </NavLink>
        <NavLink activeClassName="navlink-active" to="/contact-data" exact>
          <li>Contact</li>
        </NavLink>
        
         <button onClick={() => logout()}>Se déconnecter</button>
        
      </ul>
    </nav>
  );
};

export default Navbar;
