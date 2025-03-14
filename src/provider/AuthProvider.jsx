import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "@/firebase/firebase_init";
import { AuthContext } from "@/contexts/contexts";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // email pass signup
  const signUpEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // email pass signin
  const signinEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // google signin
  const signupWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // forget data
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // provider data
  const authInfo = {
    signupWithGoogle,
    signUpEmailPass,
    signinEmailPass,
    resetPassword,
    logout,
    user,
    loading,
    setLoading,
  };

  //get current signed in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);

        // generate jwt
        axiosPublic
          .post("/jwt", {
            email: user.email,
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.token);
          })
          .catch((e) => {
            console.log(e);
          });

        // register user data to database
        axiosSecure
          .post("/users", {
            email: user.email,
            userName: user.displayName,
            role: "user",
          })
          .then((res) => console.log(res.data));
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic, axiosSecure]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
