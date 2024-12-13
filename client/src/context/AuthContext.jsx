import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore"; //firstname

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL;

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
        firebaseUser.getIdTokenResult().then((idTokenResult) => {
          console.log("idTokenResult", idTokenResult);

          const signUpCompleted = !!idTokenResult.claims.signUpCompleted;
          firebaseUser.signUpCompleted = signUpCompleted;
          console.log("firebaseUser", firebaseUser);

          setUser(firebaseUser);
        });
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
      return await user.getIdToken();
    }
    return null;
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  async function refreshUser() {
    if (auth.currentUser) {
      try {
        setLoading(true);
        const idTokenResult = await auth.currentUser.getIdTokenResult(true);

        const signUpCompleted = idTokenResult.claims.signUpCompleted;
        auth.currentUser.signUpCompleted = signUpCompleted;

        setUser(auth.currentUser);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  async function updateUserInfo(userInfo) {
    try {
      if (!user) {
        throw new Error("User not logged in");
      }
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // date_of_birth: formData.date_of_birth,
          // gender: formData.gender,
          // weight: formData.weight,
          // height: formData.height,
          // activity_level: formData.activity_level,
          ...userInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update userProfile " + response.status);
      }

      const data = await response.json();
      setUserData(data);
      refreshUser();
    } catch (error) {
      console.error("Error updating user info:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        //refreshUser,
        updateUserInfo,
        setUser,
        getToken,
        signOut: () => signOut(auth),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
