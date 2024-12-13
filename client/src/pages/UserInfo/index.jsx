import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserInfoForm from "../../components/UserInfoForm/index.jsx";
import "./UserInfo.css";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const navigate = useNavigate();
  const { updateUserInfo } = useContext(AuthContext);

  function handleNextStep() {
    navigate("/register/allergene");
  }

  async function onFormSubmit(formData) {
    try {
      await updateUserInfo(formData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {" "}
      <div className="personal-container">
        <h2>Persönliche Angaben!</h2>
        <UserInfoForm
          onFormSubmit={onFormSubmit}
          goToNextStep={handleNextStep}
        />
      </div>
    </>
  );
}
