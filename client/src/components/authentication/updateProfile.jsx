import { updateProfile } from "firebase/auth";

const updateUserProfile = async (user, newDisplayName, newPhotoURL) => {
  try {
    await updateProfile(user, {
      displayName: newDisplayName,
      photoURL: newPhotoURL,
    });
    console.log("User profile updated!");
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};
