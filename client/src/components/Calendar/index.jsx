import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { Link } from "react-router-dom";
const localizer = momentLocalizer(moment);
moment.tz.setDefault("Europe/Berlin");
const API_URL = import.meta.env.VITE_API_URL;

const RecipePlanner = ({ name, link, recipe_id }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(AuthContext);

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
        console.error("Fehler beim Speichern des Events:", error);
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
        const response = await fetch(`${API_URL}/planner`);
        const savedEvents = await response.json();
        const mappedEvents = savedEvents.map((event) => ({
          ...event,
          date: moment(event.date),
          title: event.recipe_title,
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Fehler beim Abrufen der Events:", error);
      }
    }

    fetchEvents();
  }, [selectedDate]);

  return (
    <div className="p-4">
      {recipe_id && (
        <h4 className="text-center text-2xl font-bold mb-4">
          <Link to="/profile">Mein Profile</Link>
        </h4>
      )}

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
          onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)}
          onSelectEvent={() => window.open(link, "_blank")}
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

      {selectedDate && recipe_id && (
        <div className="flex justify-center mt-4">
          {/* <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={}
          >
            {name} für den {moment(selectedDate).format("DD.MM.YYYY")} planen
          </button> */}
        </div>
      )}
    </div>
  );
};

export default RecipePlanner;
