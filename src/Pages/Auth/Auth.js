import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import "./Auth.css";

const Auth = ({ signin }) => {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      signin(!!currentUser);
    });
  }, []);

  const login = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      signin(true);
    } catch (error) {
      alert("mauvais identifiants mi amor");
    }
  };

  return (
    <form className="form-auth" onSubmit={(e) => login(e)}>
      <div className="inputs-container">
        <h2>Bonjour titete</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mdp"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button>Login</button>
      </div>
    </form>
  );
};

export default Auth;
