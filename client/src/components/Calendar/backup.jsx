import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

const localizer = momentLocalizer(moment);
moment.tz.setDefault("Europe/Berlin");
const API_URL = import.meta.env.VITE_API_URL;

const RecipePlanner = ({ name, link, recipe_id }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(AuthContext);
  const [showWeek, setShowWeek] = useState(false);
  const shoppingListUrl = "https://rewe.de";

  useEffect(() => {
    const saveEventToServer = async (newEvent) => {
      try {
        const token = await user.getIdToken();

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

    const planRecipe = async () => {
      if (selectedDate) {
        const newEvent = {
          uid: user.uid,
          recipe_title: name,
          date: moment(selectedDate).format("YYYY-MM-DD"),
          recipe_id: recipe_id,
          link: link,
        };

        await saveEventToServer(newEvent);

        setEvents((prevEvents) => [
          ...prevEvents,
          { ...newEvent, date: selectedDate },
        ]);
        setSelectedDate(null);
      }
    };
    planRecipe();
  }, [selectedDate]);

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
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchEvents();
  }, [selectedDate]);
  console.log(events);
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
  console.log(showWeek);
  function handleEventClick(event) {
    const urlLink = `recipedetails/${event.recipe_id}`;
    window.open(urlLink, "_self");
  }
  console.log(filteredEvents);
  return (
    <div className="Calendar">
      {recipe_id && (
        <h4>
          <Link to="/profile">Mein Profile</Link>
        </h4>
      )}
      <div className="calender-container">
        <div className="">
          <button
            className=""
            onClick={() => {
              setShowWeek(false);
            }}
          >
            Kalender
          </button>
        </div>
        <button className="" onClick={toggleWeekView}>
          Meine Rezepte diese Woche
        </button>
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
            onSelectEvent={handleEventClick}
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
      {/* Anzeige der Events und QR-Code, wenn showWeek true ist */}
      {showWeek && (
        <div>
          <ul className="week-events">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <li key={event.date} className="day-item">
                  <div className="day-header">
                    <strong>{moment(event.date).format("DD.MM.YYYY")}</strong>
                  </div>
                  <div className="day-events">
                    <div className="event">{event.title}</div>
                  </div>
                </li>
              ))
            ) : (
              <div className="no-events">Keine Events diese Woche</div>
            )}
          </ul>

          {/* QR-Code für die Einkaufsliste */}
          {/* <div>
            <h2>Scanne diesen QR-Code, um deine Einkaufsliste zu sehen</h2>
            <QRCode
              // value={"some data, a link or whatever"}
              value={shoppingListUrl}
              size={256}
              viewBox={`0 0 256 256`}
            />
            <p>
              Scanne den QR-Code mit deinem Handy, um deine Einkaufsliste zu
              erhalten!
            </p>
            DEVELOPMENT: <a href="/scanner">Scanner</a>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default RecipePlanner;
