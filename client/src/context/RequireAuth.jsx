import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
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
    }
    // else {
    //   return <Navigate to="/register/userinfo" />;
    // }
  }

  return children;
};
//   if (user) {
//     if (user.signUpCompleted) {
//       return <>{children}</>;
//     } else {
//       return <Navigate to="/register/userinfo" />;
//     }
//   }
//   return <Navigate to="/login" />;
// };
