import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const Product = () => {
  /* Récuperation du parametre en url */
  const { slug } = useParams();

  /* Appel du state de products */

  const { products } = useSelector((state) => ({
    ...state.productReducer,
  }));

  /* fonction permettant de retrouver le produit en focntion du parametre url */
  const productClicked = products.find(
    (obj) => obj.name.replace(/\s+/g, "").trim() === slug
  );

  /* Tous les informations d'un produit */

  const [name, setName] = useState(productClicked.name);
  const [category, setCategory] = useState(productClicked.category);
  const [color, setColor] = useState({
    firstColor: productClicked.color.firstColor,
    secondColor: productClicked.color.secondColor,
    thirdColor: productClicked.color.thirdColor
  });
  const [description, setDescription] = useState(productClicked.description);
  const [enamelling, setEnamelling] = useState(productClicked.enamelling);
  const [image, setImage] = useState({
    firstImage: productClicked.image.firstImage,
    secondImage: productClicked.image.secondImage,
    thirdImage: productClicked.image.thirdImage,
  });
  const [material, setMaterial] = useState(productClicked.material);
  const [dimensions, setDimensions] = useState({
    height: productClicked.dimensions.height,
    width: productClicked.dimensions.width,
  });
  const [quantity, setQuantity] = useState(productClicked.quantity);
  const [price, setPrice] = useState(productClicked.price);

  /* Recuperation valeur Select */

  const selectValue = (e) => {
    if (e.target.options.selectedIndex === 1) {
      setEnamelling(true);
    } else if (e.target.options.selectedIndex === 2) {
      setEnamelling(false);
    }
  };




  /* Redicretion page  */

  let history = useHistory();

  const backHome = () => {
    history.push("/");
  };

  /* Update un user */

  const upadteProduct = async (id) => {
    const productDoc = doc(db, "Product", id);
    if (
      name === undefined ||
      category === undefined ||
      color.firstColor === "" ||
      description === undefined ||
      enamelling === undefined ||
      image.firstImage === "" ||
      image.secondImage === "" ||
      image.thirdImage === "" ||
      material === undefined ||
      dimensions.height === 0 ||
      dimensions.width === 0 ||
      quantity === undefined ||
      price === undefined
    ) {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        name: name,
        category: category,
        color: {
          firstColor: color.firstColor,
          secondColor: color.secondColor,
          thirdColor: color.thirdColor
        },
        description: description,
        enamelling: enamelling,
        image: {
          firstImage: image.firstImage,
          secondImage: image.secondImage,
          thirdImage: image.thirdImage,
        },
        material: material,
        dimensions: {
          height: dimensions.height,
          width: dimensions.width,
        },
        quantity: quantity,
        price: price,
      };
      await updateDoc(productDoc, newFields);

      backHome();
    }
  };

  /* Delete an User */
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Product", id);
    await deleteDoc(productDoc);
    backHome();
  };

  return (
    <form
      className="product-form"
      onSubmit={(e) => {
        e.preventDefault();
        upadteProduct(productClicked.id);
      }}
    >
      <label htmlFor="name">Nom</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
      />
      <label htmlFor="category">Categorie</label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        id="category"
      />
      <label htmlFor="firstcolor">Premiere Couleur</label>
      <span style={{backgroundColor: color.firstColor}}></span>
      <input
        value={color.firstColor}
        onChange={(e) =>
          setColor({
            ...color,
            firstColor: e.target.value,
          })
        }
        type="text"
        id="firstcolor"
      />
      <label htmlFor="secondcolor">Deuxieme Couleur</label>
      <span style={{backgroundColor: color.secondColor}}></span>
      <input
        value={color.secondColor}
        onChange={(e) =>
          setColor({
            ...color,
            secondColor: e.target.value,
          })
        }
        type="text"
        id="secondcolor"
      />
      <label htmlFor="thirdColor">Troisieme Couleur</label>
      <span style={{backgroundColor: color.thirdColor}}></span>
      <input
        value={color.thirdColor}
        onChange={(e) =>
          setColor({
            ...color,
            thirdColor: e.target.value,
          })
        }
        type="text"
        id="thirdColor"
      />
      <label htmlFor="description">Description</label>
      <textarea
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="enamelling">Emaillage</label>
      <select
        id="enamelling"
        value={enamelling}
        onChange={(e) => selectValue(e)}
      >
        <option>Email?</option>
        <option value="true">Vrai</option>
        <option value="false">Faux</option>
      </select>

      <label htmlFor="image1">Image Principale</label>
      <img src={image.firstImage} alt="produit 3eme "></img>
      <input
        value={image.firstImage}
        onChange={(e) =>
          setImage({
            ...image,
            firstImage: e.target.value,
          })
        }
        type="text"
        id="image1"
      />
      <label htmlFor="image2">Image Secondaire</label>
      <img src={image.secondImage} alt="produit 3eme "></img>
      <input
        value={image.secondImage}
        onChange={(e) =>
          setImage({
            ...image,
            secondImage: e.target.value,
          })
        }
        type="text"
        id="image2"
      />
      <label htmlFor="image3">Image 3eme </label>
      <img src={image.thirdImage} alt="produit 3eme "></img>
      <input
        value={image.thirdImage}
        onChange={(e) =>
          setImage({
            ...image,
            thirdImage: e.target.value,
          })
        }
        type="text"
        id="image3"
      />
      <label htmlFor="material">Materiau</label>
      <input
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        type="text"
        id="material"
      />
      <label htmlFor="height">Hauteur</label>
      <input
        value={dimensions.height}
        onChange={(e) =>
          setDimensions({
            ...dimensions,
            height: e.target.value,
          })
        }
        type="number"
        id="height"
      />
      <label htmlFor="width">Largeur</label>
      <input
        value={dimensions.width}
        onChange={(e) =>
          setDimensions({
            ...dimensions,
            width: e.target.value,
          })
        }
        type="number"
        id="width"
      />
      <label htmlFor="quantity">Quantité</label>
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        id="quantity"
      />
      <label htmlFor="price">Prix</label>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        id="price"
      />
      <div className="button-container">
        <button className="button-modify" type="submit">
          Modifier ce produit
        </button>
        <button
          className="button-delete"
          type="button"
          onClick={() => {
            if (
              window.confirm("Tu es sûre de vouloir supprimer ce produit ?")
            ) {
              deleteProduct(productClicked.id);
            } else {
            }
          }}
        >
          Supprimer ce produit
        </button>
      </div>
    </form>
  );
};

export default Product;
