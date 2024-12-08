import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./RecipeFeedback.css";
const RecipeFeedback = ({ recipeId, onSubmitFeedback, setShowPopup }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const { user } = useContext(AuthContext);
  console.log("recipeId", recipeId);
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      recipe_id: recipeId,
      rating,
      comments,
    };
    setShowPopup && setShowPopup(false);

    onSubmitFeedback(feedback);
    console.log(feedback, "ww");

    setRating(0);
    setComments("");
  };
  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h3>Provide Your Feedback</h3>
      <label>
        Rating (1 to 5 stars):
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
          placeholder="Write your comments here..."
        />
      </label>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default RecipeFeedback;
