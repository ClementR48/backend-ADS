import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
const ContactFront = () => {
  const { contactData } = useSelector((state) => ({
    ...state.productReducer,
  }));
  /* recuperation de toutes les data pour les afficher  */

  console.log(contactData);
  const dispatch = useDispatch();

  const contacttCollectionRef = collection(db, "Contact");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(contacttCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: "LOADCONTACTDATA",
        payload: newData,
      });
    };

    getData();
  }, []);
  const [activeUpdate, setActiveUpdate] = useState(false);

  const [background, setBackground] = useState();
  const [imageForm, setImageForm] = useState();
  const [textContact, setTextContact] = useState();

  useEffect(() => {
    if (contactData.length !== 0) {
      setImageForm(contactData[0].formImage);
      setBackground(contactData[0].backgroundImage);
      setTextContact(contactData[0].txt);
    }
  }, [contactData]);

  /* Update un user */

  const upadteContact = async (id) => {
    const contactDoc = doc(db, "Contact", id);
    if (
      background === "" ||
      imageForm === "" ||
      textContact === "" 
      
    ) {
      alert("Tous les champs doivent être remplis");
    } else {
      const newFields = {
        formImage: imageForm,
        backgroundImage: background,
        txt: textContact
      };
      await updateDoc(contactDoc, newFields);
    }
  };
  return (
    <>
      {contactData.length !== 0 ? (
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
                      <img src={contactData[0].formImage} alt="" />
                    </td>
                    <td>{contactData[0].txt}</td>
                    <td>
                      <img src={contactData[0].backgroundImage} alt="" />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <input
                        type="text"
                        value={imageForm}
                        onChange={(e) => setImageForm(e.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        type="text"
                        value={textContact}
                        onChange={(e) => setTextContact(e.target.value)}
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
          <button onClick={e => upadteContact(contactData[0].id)} >Modifier</button>
        </>
      ) : (
        "loading"
      )}
    </>
  );
};

export default ContactFront;