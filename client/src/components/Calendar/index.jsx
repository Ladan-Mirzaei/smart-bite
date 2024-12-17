import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { useNavigate, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./calender.css";

const localizer = momentLocalizer(moment);
moment.tz.setDefault("Europe/Berlin");
const API_URL = import.meta.env.VITE_API_URL;

const RecipePlanner = ({ name, recipe_id }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(AuthContext);
  const [showWeek, setShowWeek] = useState(false);
  const shoppingListUrl = `https://192.168.2.124:5173/shoppinglist?user_uid=${user.uid}`;

  useEffect(() => {
    const saveEventToServer = async (newEvent) => {
      try {
        const token = await user.getIdToken();
        // /**/speichen newEvent in DB

        await fetch(`${API_URL}/planner`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    async function planRecipe() {
      if (selectedDate) {
        const newEvent = {
          uid: user.uid,
          recipe_title: name,
          date: moment(selectedDate).format("YYYY-MM-DD"),
          recipe_id: recipe_id,
          // link: link,
        };
        saveEventToServer(newEvent);
        setEvents((prev) => [...prev, { ...newEvent, date: selectedDate }]);
        setSelectedDate(null);
        console.log("setEvents", events, newEvent);
      }
    }
    planRecipe();
  }, [selectedDate]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = await user.getIdToken();
        console.log("recipee_id", recipe_id);
        const response = await fetch(`${API_URL}/planner/events`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });
        const savedEvents = await response.json();
        //änderung zeile events löchen und nur savedEvents  schreiben

        const events =
          savedEvents && Array.isArray(savedEvents) ? savedEvents : [];

        const mappedEvents = events?.map((event) => ({
          ...event,
          date: moment(event.date),
          title: event.event_name,
          recipe_id: event.recipe_id,
          ingredients: event.ingredients,
          event_id: event.event_id,
        }));
        mappedEvents.sort((a, b) => a.date - b.date);

        setEvents(mappedEvents);
        console.log("mappedEvents-recipe_id", mappedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchEvents();
  }, [selectedDate]);
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.date);

    if (endOfWeek > eventDate && eventDate > startOfWeek) {
      return true;
    }
    return false;
  });
  const toggleWeekView = () => {
    setShowWeek(!showWeek);
  };
  function handleEventClick(event) {
    // /***************** */
    const urlLink = `${event.recipe_id}`;
    // window.open(urlLink, "_self");
    navigate(`/recipedetails/${urlLink}`);
  }
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
  console.log(result);
  return (
    <div className="Calendar">
      {recipe_id && <h4>{/* <Link to="/profile">Mein Profile</Link> */}</h4>}
      <div className="calender-container">
        <div className="">
          <button
            onClick={() => {
              setShowWeek(false);
            }}
          >
            Kalender
          </button>
        </div>
        <button onClick={toggleWeekView}>Essensplan für die Woche</button>
      </div>
      {!showWeek && (
        <div className="mt-8">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="date"
            endAccessor="date"
            style={{ height: 400 }}
            selectable
            views={["month"]}
            defaultView="month"
            onSelectSlot={(slotInfo) =>
              recipe_id ? setSelectedDate(slotInfo.start) : null
            }
            onSelectEvent={(event) => handleEventClick(event)}
            eventPropGetter={() => ({
              style: {
                height: "20px",
                fontSize: "0.6em",
                padding: "3px",
                lineHeight: "1.5em",
                backgroundColor: "#a9c2bc",
                color: "#323534",
                borderRadius: "0px",
                border: "none",
              },
            })}
          />
        </div>
      )}
      {showWeek && (
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
                        <Link to={`/recipedetails/${event?.recipe_id}`}>
                          <strong>{event.title}</strong>
                        </Link>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Es wurden keine Rezepte für diese Woche ausgewählt.</p>
          )}
          {/* QR-Code für die Einkaufsliste */}
          <div>
            <p>Scanne diesen QR-Code, um deine Einkaufsliste zu sehen</p>
            <QRCode
              // value={"some data, a link or whatever"}
              value={shoppingListUrl}
              size={80}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePlanner;
