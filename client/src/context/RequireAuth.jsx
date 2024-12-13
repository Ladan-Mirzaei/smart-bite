import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log("RequireAuth:", { user, completed: user?.signUpCompleted });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    if (user.signUpCompleted) {
      return <>{children}</>;
    } else {
      return <Navigate to="/register/userinfo" />;
    }
  }

  return <Navigate to="/login" />;
};
