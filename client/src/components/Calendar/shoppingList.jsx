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
  console.log("uIdFromSearchParams", uIdFromSearchParams);

  useEffect(() => {
    async function fetchEvents() {
      const uid = uIdFromSearchParams ? uIdFromSearchParams : user.uid;
      console.log("test-uid", uid);
      try {
        // const token = await user.getIdToken();
        const url = `${API_URL}/planner/events`;
        console.log("url:", url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        });
        console.debug("user:", JSON.stringify(user));
        console.debug("response.ok: ", response.ok);
        console.debug("response.status: ", response.status);
        console.debug("response.statusText: ", response.statusText);
        const savedEvents = await response.json();
        console.debug({ savedEvents });
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

  const result = filteredEvents.reduce((acc, cur) => {
    if (acc[cur.date]) {
      return {
        ...acc,
        [cur.date]: [...acc[cur.date], cur],
      };
    } else {
      return {
        ...acc,
        [cur.date]: [cur],
      };
    }
  }, {});
  console.log("result", result);

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
                      {event.ingredients?.ingredient_names.map(
                        (ingredient, idx) => (
                          <div key={idx} className="ingredient-item-shoplist">
                            <p>{ingredient}</p>
                            <p>{event.ingredients.ingredient_units[idx]}</p>
                            <p>
                              {event.ingredients.ingredient_quantities[idx]}
                            </p>
                          </div>
                        )
                      )}
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
