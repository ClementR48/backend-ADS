import React, { useEffect } from "react";
import "./ListProduct.css";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";

const ListProduct = () => {
  const { products } = useSelector((state) => ({
    ...state.productReducer,
  }));

  const dispatch = useDispatch();

  const productsCollectionRef = collection(db, "Product");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADPRODUCTS",
        payload: newData,
      });
    };

    getProducts();

  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Nom</th>
          <th>Categorie</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Qté</th>
          <th>+ détails</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            
              <tr className={product.quantity === "0" ? "tr-empty" : ""} key={product.id}>
                <td><img src={product.image.firstImage} alt="produit" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}€</td>
                <td>{product.quantity}</td>
                <td><Link
                to={`/produit/${product.name.replace(/\s+/g, "").trim()}`}
                ><ExternalLink color="white" size="35"/></Link></td>
                
              
              </tr>
            
          );
        })}
      </tbody>
    </table>
  );
};

export default ListProduct;
