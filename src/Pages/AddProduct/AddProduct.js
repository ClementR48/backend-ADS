import React, { useEffect, useState } from "react";

import "./AddProduct.css";
import { useHistory } from "react-router-dom";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = () => {
  /* Appel de toutes les catégorie */

  const { categories } = useSelector((state) => ({
    ...state.productReducer,
  }));

  const dispatch = useDispatch();

  const categoryCollectionRef = collection(db, "Category");

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoryCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADCATEGORIES",
        payload: newData,
      });
    };

    getCategories();
  }, []);

  /* Tous les states */

  const [name, setName] = useState("");
  const [category, setCategory] = useState({
    name: "",
    logo: "",
  });
  const [color, setColor] = useState({
    firstColor: "",
    secondColor: "",
    thirdColor: "",
  });
  const [description, setDescription] = useState("");
  const [enamelling, setEnamelling] = useState(true);
  const [image, setImage] = useState({
    firstImage: "",
    secondImage: "",
    thirdImage: "",
  });
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  /* Create a new Product  */

  const productsCollectionRef = collection(db, "Product");
  

  const createProduct = async () => {
    if (
      name === "" ||
      category.name === "" ||
      color.firstColor === "" ||
      description === "" ||
      enamelling === "" ||
      image.firstImage === "" ||
      image.secondImage === "" ||
      image.thirdImage === "" ||
      material === "" ||
      dimensions.height === 0 ||
      dimensions.width === 0 ||
      quantity === 0 ||
      price === 0
    ) {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        name: name,
        category: {
          name: category.name,
          logo: category.logo,
        },
        color: {
          firstColor: color.firstColor,
          secondColor: color.secondColor,
          thirdColor: color.thirdColor,
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

  /* func qui choisit automatiquement le logo correspondant a la categorie */

  const handleCategory = (e) => {
    const categChoose = categories.filter(
      (categorie) => categorie.name === e.target.value
    );
    if (categChoose.length > 0) {
      setCategory({ name: categChoose[0].name, logo: categChoose[0].logo });
    }
  };



  /* func go to home page after add new or update product */

  let history = useHistory();

  const backHome = () => {
    history.push("/");
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
      <label htmlFor="categories">Categorie</label>
      <select
        id="categories"
        value={category.name}
        onChange={(e) => {
          setCategory({ ...category, name: e.target.value });
          handleCategory(e);
        }}
      >
        <option value="">Categorie</option>
        {categories.map((categ) => {
          return (
            <option value={categ.name} key={categ.id}>
              {categ.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="firstcolor">Premiere Couleur</label>
      <span style={{ backgroundColor: color.firstColor }}></span>
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
      <span style={{ backgroundColor: color.secondColor }}></span>
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
      <span style={{ backgroundColor: color.thirdColor }}></span>
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
        onChange={(e) => setEnamelling(e.target.value)}
      >
        <option value="">Email ?</option>
        <option value="true">Vrai</option>
        <option value="false">Faux</option>
      </select>

      <label htmlFor="image1">Image Principale</label>
      {image.firstImage === "" ? (
        ""
      ) : (
        <img src={image.firstImage} alt="produit 3eme "></img>
      )}
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
      {image.secondImage === "" ? (
        ""
      ) : (
        <img src={image.secondImage} alt="produit 3eme "></img>
      )}
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
      {image.thirdImage === "" ? (
        ""
      ) : (
        <img src={image.thirdImage} alt="produit 3eme "></img>
      )}
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
            height: Number(e.target.value),
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
            width: Number(e.target.value),
          })
        }
        type="number"
        id="width"
      />
      <label htmlFor="quantity">Quantité</label>
      <input
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        type="number"
        id="quantity"
      />
      <label htmlFor="price">Prix</label>
      <input
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        type="number"
        id="price"
      />
      <button>Ajouter un produit</button>
    </form>
  );
};

export default AddProduct;
