import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }

  //   return children;
  // };
  if (user) {
    if (user.signUpCompleted) {
      return <>{children}</>;
    } else {
      return <Navigate to="/register/userinfo" />;
    }
  }
  return <Navigate to="/login" />;
};
