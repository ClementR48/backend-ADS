import React, { useState } from "react";

import "./AddProduct.css";
import { useHistory } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const AddProduct = () => {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [color, setColor] = useState({
    firstColor: "",
    secondColor: "",
  });
  const [description, setDescription] = useState();
  const [enamelling, setEnamelling] = useState();
  const [image, setImage] = useState({
    firstImage: "",
    secondImage: "",
    thirdImage: "",
  });
  const [material, setMaterial] = useState();
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const selectValue = (e) => {
    if (e.target.options.selectedIndex === 1) {
      setEnamelling(true);
    } else if (e.target.options.selectedIndex === 2) {
      setEnamelling(false);
    }
  };

  let history = useHistory();

  const backHome = () => {
    history.push("/");
  };

  const productsCollectionRef = collection(db, "Product");

  /* Create un nouvel user */
  const createProduct = async () => {
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
      await addDoc(productsCollectionRef, newFields);
      backHome();
    }
  };

  return (
    <form
      className="product-form"
      onSubmit={(e) => {
        e.preventDefault();
        createProduct();
      }}
    >
      <p> Tous les champs doivent etre remplis</p>
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
      <label htmlFor="firstcolor">Couleurs</label>
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
      <label htmlFor="secondcolor">Couleurs</label>
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
        <option>Email ?</option>
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
      <button>Ajouter un produit</button>
    </form>
  );
};

export default AddProduct;
