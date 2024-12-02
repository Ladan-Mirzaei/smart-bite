import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";

moment.tz.setDefault("Europe/Berlin");
const API_URL = import.meta.env.VITE_API_URL;

const RecipePlanner = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/planner/events`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });

        const savedEvents = await response.json();
        const mappedEvents = savedEvents.map((event) => ({
          ...event,
          date: moment(event.date),
          title: event.event_name,
          recipe_id: event.recipe_id,
          ingredients: event.ingredients,
          event_id: event.event_id,
        }));
        mappedEvents.sort((a, b) => a.date - b.date);
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchEvents();
  }, [user]);

  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.date);
    return eventDate.isBetween(startOfWeek, endOfWeek);
  });

  return (
    <div>
      <h3>Meine Einkaufsliste für diese Woche</h3>

      {filteredEvents.length > 0 ? (
        <ul className="week-events">
          {filteredEvents
            .sort((a, b) => a.date.isBefore(b.date))
            .map((event) => (
              <li key={event.event_id} className="day-item">
                <div className="day-header">
                  <strong>{moment(event.date).format("DD.MM.YYYY")}</strong>
                </div>
                <div className="day-events">
                  <strong>{event.title}</strong>
                  <div className="ingredients">
                    {event.ingredients.ingredient_names.map(
                      (ingredient, index) => (
                        <div key={index} className="ingredient-item">
                          <p>{ingredient}</p>
                          <p>{event.ingredients.ingredient_units[index]}</p>
                          <p>
                            {event.ingredients.ingredient_quantities[index]}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p>Keine Events für diese Woche</p>
      )}
    </div>
  );
};

export default RecipePlanner;
