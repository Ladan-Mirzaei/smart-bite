import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { useSearchParams } from "react-router-dom";

moment.tz.setDefault("Europe/Berlin");
const API_URL = import.meta.env.VITE_API_URL;

const RecipePlanner = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const uIdFromSearchParams = searchParams.get("user_uid");

  useEffect(() => {
    async function fetchEvents() {
      const uid = uIdFromSearchParams ? uIdFromSearchParams : user.uid;
      try {
        const url = `${API_URL}/planner/events`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
          console.error("Fehler beim Abrufen der Daten:", response.statusText);
          return;
        }

        const savedEvents = await response.json();
        const mappedEvents = savedEvents.map((event) => {
          const ingredients = event.ingredients.ingredient_names.map(
            (name, idx) => ({
              name,
              unit: event.ingredients.ingredient_units?.[idx] || "n/a",
              quantity: event.ingredients.ingredient_quantities?.[idx] || "n/a",
            })
          );

          return {
            ...event,
            date: moment(event.date),
            title: event.event_name,
            ingredients,
            event_id: event.event_id,
          };
        });

        mappedEvents.sort((a, b) => a.date - b.date);
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchEvents();
  }, [user, uIdFromSearchParams]);

  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.date);
    return eventDate.isBetween(startOfWeek, endOfWeek, null, "[]");
  });

  const result = filteredEvents.reduce((acc, cur) => {
    const dateKey = cur.date.format("YYYY-MM-DD");
    if (acc[dateKey]) {
      return {
        ...acc,
        [dateKey]: [...acc[dateKey], cur],
      };
    } else {
      return {
        ...acc,
        [dateKey]: [cur],
      };
    }
  }, {});

  return (
    <div>
      <h3>Meine Einkaufsliste für diese Woche</h3>
      {Object.keys(result).length > 0 ? (
        <ul className="week-events">
          {Object.keys(result).map((date, index) => (
            <li key={index} className="day-item">
              <div className="day-header">
                <strong>{moment(date).format("DD.MM.YYYY")}</strong>
              </div>
              <div className="day-events">
                {result[date].map((event, index) => (
                  <div key={index}>
                    <strong>{event.title}</strong>
                    <div className="ingredients">
                      {event.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="ingredient-item-shoplist">
                          <p>{ingredient.name}</p>
                          <p>{ingredient.unit}</p>
                          <p>{ingredient.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Es wurden keine Rezepte für diese Woche ausgewählt.</p>
      )}
    </div>
  );
};

export default RecipePlanner;
