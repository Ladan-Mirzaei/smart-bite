import { useAuth } from "./AuthProvider";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.email}</h1>
      ) : (
        <h1>Not logged in,Please log in or sign up</h1>
      )}
    </div>
  );
}

export default Profile;
