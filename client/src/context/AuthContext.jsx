import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore"; //firstname

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); //firstname

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore(); //firstname

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ++++++++++++++++++++++++++++
        // firebaseUser.getIdTokenResult().then((idTokenResult) => {
        //   console.log("idTokenResult", idTokenResult);
        //   setUser({
        //     ...firebaseUser,
        //     signUpCompleted: !!idTokenResult.claims.signUpCompleted,
        //   });
        // });
        // ********************************
        setUser(firebaseUser);

        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            console.log("User document found:", userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.warn("User document does not exist in Firestore.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        console.log("No user is signed in.");

        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getToken = async () => {
    if (user) {
      console.log("IdTocken", user.getIdToken);
      return await user.getIdToken();
    }
    return null;
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  // async function refreshUser() {
  //   if (auth.currentUser) {
  //     try {
  //       setLoading(true);
  //       const idTokenResult = await auth.currentUser.getIdTokenResult(true);
  //       setUser({
  //         ...auth.currentUser,
  //         signUpCompleted: idTokenResult.claims.signUpCompleted,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        // refreshUser,
        setUser,
        getToken,
        signOut: () => signOut(auth),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
