import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useAuth } from "../../context/AuthContext";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import { updateUserInfo } from "../../functions/updateUserInfo.js";

export default function EditForm({
  setShowPopupDiet,
  setShowPopupcategory,
  setShowPopupAllergene,
  route,
  placeholder,
}) {
  const { fetchData } = useFetch();
  const [resultData, setResultData] = useState([]);
  const { user } = useAuth();

  const [userUpdateData, SetUserUpdateData] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await user.getIdToken();
    const result = await updateUserInfo(token, route, resultData);
    SetUserUpdateData(result);
    setShowPopupDiet && setShowPopupDiet(false);

    setShowPopupcategory && setShowPopupcategory(false);

    setShowPopupAllergene && setShowPopupAllergene(false);
  }
  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };
  return (
    <div className="popup-update-container">
      <form onSubmit={handleSubmit}>
        <SelectWithPlus
          dataArray={resultData}
          setDataArray={setResultData}
          route={route}
          placeholder={placeholder}
        />
        <button className="popup-update-container-button " type="submit">
          speichern
        </button>
      </form>
    </div>
  );
}
