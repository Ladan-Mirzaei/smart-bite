import { useState } from "react";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import { updateUserInfo } from "../../functions/updateUserInfo.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function EditForm({
  setShowPopupDiet,
  setShowPopupcategory,
  setShowPopupAllergene,
  route,
  placeholder,
}) {
  const [resultData, setResultData] = useState([]);
  const { user } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await user.getIdToken();
    await updateUserInfo(token, route, resultData);
    setShowPopupDiet && setShowPopupDiet(false);

    setShowPopupcategory && setShowPopupcategory(false);

    setShowPopupAllergene && setShowPopupAllergene(false);
  }

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
