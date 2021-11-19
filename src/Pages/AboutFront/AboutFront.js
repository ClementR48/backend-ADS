import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const AboutFront = () => {
  const { aboutData } = useSelector((state) => ({
    ...state.productReducer,
  }));
  /* recuperation de toutes les data pour les afficher  */

  console.log(aboutData);
  const dispatch = useDispatch();

  const aboutCollectionRef = collection(db, "About");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(aboutCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADABOUTDATA",
        payload: newData,
      });
    };

    getData();
  }, []);
  const [activeUpdate, setActiveUpdate] = useState(false);

  const [background, setBackground] = useState();
  const [imageMarie, setImageMarie] = useState();
  const [textAbout, setTextAbout] = useState();

  useEffect(() => {
    if (aboutData.length !== 0) {
      setImageMarie(aboutData[0].picture);
      setBackground(aboutData[0].backgroundImage);
      setTextAbout(aboutData[0].txt);
    }
  }, [aboutData]);

  /* Update un user */

  const upadteAbout = async (id) => {
    const homeDoc = doc(db, "About", id);
    if (
      background === "" ||
      imageMarie === "" ||
      textAbout === "" 
      
    ) {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        picture: imageMarie,
        backgroundImage: background,
        txt: textAbout
      };
      await updateDoc(homeDoc, newFields);
    }
  };

  return (
    <>
      {aboutData.length !== 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>image</th>
                <th>txt</th>
                <th>image de fond</th>
                <th>btns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {!activeUpdate ? (
                  <>
                    <td>
                      <img src={aboutData[0].picture} alt="" />
                    </td>
                    <td>{aboutData[0].txt}</td>
                    <td>
                      <img src={aboutData[0].backgroundImage} alt="" />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <input
                        type="text"
                        value={imageMarie}
                        onChange={(e) => setImageMarie(e.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        type="text"
                        value={textAbout}
                        onChange={(e) => setTextAbout(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                      />
                    </td>
                  </>
                )}
                <td>
                  <button onClick={() => setActiveUpdate(!activeUpdate)}>
                    {activeUpdate ? "back" : "modifier"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={e => upadteAbout(aboutData[0].id)} >Modifier</button>
        </>
      ) : (
        "loading"
      )}
    </>
  );
};

export default AboutFront;
