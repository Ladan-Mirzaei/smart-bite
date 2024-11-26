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

  const planRecipe = async () => {
    if (selectedDate) {
      // const newDate = moment(selectedDate).format("DD.MM.YYYY");

      const newEvent = {
        uid: user.uid,
        recipe_title: name,
        date: selectedDate,
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
      console.log("Event gespeichert:", newEvent);
    } catch (error) {
      console.error("Fehler beim Speichern des Events:", error);
    }
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${API_URL}/planner`);
        const savedEvents = await response.json();
        // setEvents(savedEvents);
        const mappedEvents = savedEvents.map((event) => ({
          ...event,
          date: new Date(event.date),
          title: event.recipe_title,
        }));
        console.log("date22", mappedEvents);

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Fehler beim Abrufen der Events:", error);
      }
    }

    fetchEvents();
  }, []);

  console.log("events-get", events);
  const handleDateSelect = (slotInfo) => {
    console.log("slotInfo", slotInfo);
    setSelectedDate(slotInfo.start);
  };
  const handleEventClick = (event) => {
    console.log("event", event);
    if (event.link) {
      window.open(event.link, "_blank");
    } else {
      alert(`Rezept: ${event.title}`);
    }
  };

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
          onSelectSlot={handleDateSelect}
          onSelectEvent={handleEventClick}
          eventPropGetter={(event) => ({
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

      {/* Button zum Speichern des Rezepts */}
      {selectedDate && recipe_id && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={planRecipe}
          >
            {name} für den {moment(selectedDate).format("DD.MM.YYYY")} planen
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipePlanner;
