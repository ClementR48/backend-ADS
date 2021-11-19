import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ExternalLink } from "react-feather";
import { useHistory } from "react-router";

const AddCategory = () => {
  /* recuperation de toutes les categories pour les afficher  */
  const { categories } = useSelector((state) => ({
    ...state.productReducer,
  }));

  const dispatch = useDispatch();

  const categoriesCollectionRef = collection(db, "Category");

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADCATEGORIES",
        payload: newData,
      });
    };

    getCategories();
  }, []);

  /* State */

  const [addCategory, setAddCategory] = useState(false);
  const [activeUpdate, setActiveUpdate] = useState(-1);

  const [nameCategory, setNameCategory] = useState("");
  const [logoCategory, setLogoCategory] = useState("");

  const history = useHistory();

  /* Create a new categorie */

  useEffect(() => {
    if (addCategory === false) {
    }
  }, [addCategory]);

  const createProduct = async () => {
    if (nameCategory === "" || logoCategory === "") {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        name: nameCategory,
        logo: logoCategory,
      };
      await addDoc(categoriesCollectionRef, newFields);
      history.push("/");
    }
  };

  /* Update un user */

  const upadteCategory = async (id) => {
    const categoryDoc = doc(db, "Category", id);
    if (nameCategory === "" || logoCategory === "") {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        name: nameCategory,
        logo: logoCategory,
      };
      await updateDoc(categoryDoc, newFields);
      history.push("/");
    }
  };

  /* Delete an Category */
  const deleteCategory = async (id) => {
    const categoryDoc = doc(db, "Category", id);
    await deleteDoc(categoryDoc);
    history.push("/");
  };

  return (
    <>
      <button
        onClick={() => {
          setActiveUpdate(-1);
          setAddCategory(!addCategory);
        }}
      >
        Ajouter une categorie
      </button>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Logo</th>
            <th>btns</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categorie, index) => {
            return (
              <tr key={categorie.id}>
                {index !== activeUpdate ? (
                  <>
                    <td>{categorie.name}</td>
                    <td>
                      <img src={categorie.logo} alt="logo"></img>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <input
                        type="text"
                        id="name"
                        placeholder={categorie.name}
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="logo"
                        placeholder={categorie.logo}
                        value={logoCategory}
                        onChange={(e) => setLogoCategory(e.target.value)}
                      />
                    </td>
                  </>
                )}
                <td>
                  {index !== activeUpdate ? (
                    <>
                      <ExternalLink
                        data_id={categorie.id}
                        onClick={() => {
                          setActiveUpdate(index);
                          setAddCategory(false);
                        }}
                      />
                      <button onClick={() => deleteCategory(categorie.id)}>
                        Supprimer
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => upadteCategory(categorie.id)}>
                        Modifier
                      </button>
                      <button onClick={() => deleteCategory(categorie.id)}>
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {addCategory && (
        <form
          className="product-form"
          onSubmit={(e) => {
            e.preventDefault();
            createProduct();
          }}
        >
          <p> Tous les champs doivent etre remplis</p>
          <label htmlFor="name">Nom de la catégorie</label>
          <input
            type="text"
            id="name"
            value={nameCategory}
            onChange={(e) => setNameCategory(e.target.value)}
          />
          <label htmlFor="logo">Logo de la catégorie</label>
          <input
            type="text"
            id="logo"
            value={logoCategory}
            onChange={(e) => setLogoCategory(e.target.value)}
          />

          <button>Ajouter une Catégorie</button>
        </form>
      )}
    </>
  );
};

export default AddCategory;
