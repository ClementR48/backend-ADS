import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  
  doc,
  updateDoc,
  
} from "firebase/firestore";

const HomeFront = () => {
  const { homeData } = useSelector((state) => ({
    ...state.productReducer,
  }));
  /* recuperation de toutes les data pour les afficher  */

  console.log(homeData);
  const dispatch = useDispatch();

  const homeCollectionRef = collection(db, "Home");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(homeCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADHOMEDATA",
        payload: newData,
      });
    };

    getData();
  }, []);

  const [activeHomeImage, setActiveHomeImage] = useState(false);
  const [activeFirstArticle, setActiveFirstArticle] = useState(false);
  const [activeSecondArticle, setActiveSecondArtiicle] = useState(false);
  const [activeBackground, setActiveBackground] = useState(false);

  const [homeImage, setHomeImage] = useState();
  const [background, setBackground] = useState();
  const [firstArticle1, setFirstArticle] = useState({
    picture: "",
    txt: "",
    title: "",
  });
  const [secondArticle1, setSecondArticle] = useState({
    picture: "",
    txt: "",
    title: "",
  });
  useEffect(() => {
    if (homeData.length !== 0) {
      
      setHomeImage(homeData[0].homeImage);
      setBackground(homeData[0].backgroundImage);
      setFirstArticle({
        picture: homeData[0].firstArticle.picture,
        txt: homeData[0].firstArticle.txt,
        title: homeData[0].firstArticle.title,
      });
      setSecondArticle({
        picture: homeData[0].secondArticle.picture,
        txt: homeData[0].secondArticle.txt,
        title: homeData[0].secondArticle.title,
      });
    }
  }, [homeData]);

  /* Update un user */

  const upadteHome = async (id) => {
    const homeDoc = doc(db, "Home", id);
    if (
      homeImage === "" ||
      background === "" ||
      firstArticle1.picture === "" ||
      firstArticle1.txt === "" ||
      firstArticle1.title === "" ||
      secondArticle1.picture === "" ||
      secondArticle1.txt === "" ||
      secondArticle1.txt === ""
    ) {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        homeImage: homeImage,
        backgroundImage: background,
        firstArticle: {
          title: firstArticle1.title,
          picture: firstArticle1.picture,
          txt: firstArticle1.txt,
        },
        secondArticle: {
          title: secondArticle1.title,
          picture: secondArticle1.picture,
          txt: secondArticle1.txt,
        },
      };
      await updateDoc(homeDoc, newFields);
    }
  };

  return (
    <>
      {homeData.length !== 0 ? (
        <>
          {!activeHomeImage ? (
            <div className="imageMain">
              <img src={homeData[0].homeImage} alt="mainImage" />
              <button onClick={() => setActiveHomeImage(true)}>Modifier</button>
            </div>
          ) : (
            <>
              <input
                type="text"
                onChange={(e) => setHomeImage(e.target.value)}
                value={homeImage}
              ></input>
              <button>Modifier</button>
            </>
          )}
          {!activeBackground ? (
            <div className="background">
              <img src={homeData[0].backgroundImage} alt="backgroundImage" />
              <button onClick={() => setActiveBackground(true)}>Modifier</button>
            </div>
          ) : (
            <>
              <input
                type="text"
                onChange={(e) => setBackground(e.target.value)}
                value={background}
              ></input>
              <button>Modifier</button>
            </>
          )}
          <h2>Premier article</h2>
          <table>
            <thead>
              <tr>
                <th>image article</th>
                <th>titre</th>
                <th>texte</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {!activeSecondArticle ? (
                <tr>
                  <td>
                    <img src={homeData[0].secondArticle.picture} alt=""></img>
                  </td>
                  <td>{homeData[0].secondArticle.title}</td>
                  <td>{homeData[0].secondArticle.txt}</td>
                  <td>
                    <button onClick={() => setActiveSecondArtiicle(true)}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSecondArticle({
                          ...secondArticle1,
                          picture: e.target.value,
                        })
                      }
                      value={secondArticle1.picture}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSecondArticle({
                          ...secondArticle1,
                          title: e.target.value,
                        })
                      }
                      value={secondArticle1.title}
                    ></input>
                  </td>
                  <td>
                    <textarea
                      onChange={(e) =>
                        setSecondArticle({
                          ...secondArticle1,
                          txt: e.target.value,
                        })
                      }
                      value={secondArticle1.txt}
                    ></textarea>
                  </td>
                  <td>
                    <button>Modifier</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <h2>deuxieme article</h2>
          <table>
            <thead>
              <tr>
                <th>image article</th>
                <th>titre</th>
                <th>texte</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {!activeFirstArticle ? (
                <tr>
                  <td>
                    <img src={homeData[0].firstArticle.picture} alt=""></img>
                  </td>
                  <td>{homeData[0].firstArticle.title}</td>
                  <td>{homeData[0].firstArticle.txt}</td>
                  <td>
                    <button onClick={() => setActiveFirstArticle(true)}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFirstArticle({
                          ...firstArticle1,
                          picture: e.target.value,
                        })
                      }
                      value={firstArticle1.picture}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFirstArticle({
                          ...firstArticle1,
                          title: e.target.value,
                        })
                      }
                      value={firstArticle1.title}
                    ></input>
                  </td>
                  <td>
                    <textarea
                      onChange={(e) =>
                        setFirstArticle({
                          ...firstArticle1,
                          txt: e.target.value,
                        })
                      }
                      value={firstArticle1.txt}
                    ></textarea>
                  </td>
                  <td>
                    <button>Modifier</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={() => upadteHome(homeData[0].id)}>Modifier</button>
        </>
      ) : (
        "Loading"
      )}
      
    </>
  );
};

export default HomeFront;
