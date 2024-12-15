import { useState } from "react";
import "./RecipeFeedback.css";
const RecipeFeedback = ({ recipeId, onSubmitFeedback, setShowPopup }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  // const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      recipe_id: recipeId,
      rating,
      comments,
    };
    setShowPopup && setShowPopup(false);

    onSubmitFeedback(feedback);

    setRating(0);
    setComments("");
  };
  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h3>Rezept bewerten</h3>
      <label>
        Bewertung (1 bis 5 Sterne):
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Schreib deine Kommentare hierhin... 😊"
        />
      </label>
      <button type="submit"> Teile deine Meinung</button>
    </form>
  );
};

export default RecipeFeedback;
