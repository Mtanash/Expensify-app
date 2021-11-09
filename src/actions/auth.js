import { getAuth, signInWithPopup, signOut } from "@firebase/auth";
import { googleProvider } from "../firebase/firebase";

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const startLogin = () => {
  const auth = getAuth();
  return (dispatch) => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

export const startSignout = () => {
  return (dispatch) => {
    const auth = getAuth();
    return signOut(auth);
  };
};
