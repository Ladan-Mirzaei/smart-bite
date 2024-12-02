import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
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
  const [showWeek, setShowWeek] = useState(false);
  const [view, setView] = useState(Views.MONTH);

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
          title: event.recipe_title,
          recipe_id: event.recipe_id,
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Fehler beim Speichern des Events:", error);
      }
    }
    fetchEvents();
  }, [selectedDate]);

  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.date);

    if (endOfWeek > eventDate && eventDate >= startOfWeek) {
      return true;
    }

    return false;
  });

  function handleEventClick(event) {
    const urlLink = `recipedetails/${event.recipe_id}`;
    window.open(urlLink, "_self");
  }

  const toggleWeekView = () => {
    setShowWeek(!showWeek);
  };

  return (
    <div className="p-4">
      {recipe_id && (
        <h4 className="text-center text-2xl font-bold mb-4">
          <Link to="/profile">Mein Profile</Link>
        </h4>
      )}

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              setShowWeek(false);
              setView(Views.MONTH);
            }}
          >
            Kalender
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowWeek(true);
              setView(Views.WEEK);
            }}
          >
            Woche
          </button>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={toggleWeekView}
        >
          {showWeek ? "Woche ausblenden" : "Woche anzeigen"}
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
            views={[Views.MONTH, Views.WEEK]}
            view={view}
            defaultView={Views.MONTH}
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

      {showWeek && (
        <ul className="week-events mt-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li key={event.date} className="day-item">
                <div className="day-header">
                  <strong>{moment(event.date).format("DD.MM.YYYY")}</strong>
                </div>
                <div className="day-events">
                  <div className="event">{event.recipe_title}</div>
                </div>
              </li>
            ))
          ) : (
            <div className="no-events">Keine Events diese Woche</div>
          )}
        </ul>
      )}

      {selectedDate && recipe_id && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setSelectedDate(null)}
          >
            {name} für den {moment(selectedDate).format("DD.MM.YYYY")} planen
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipePlanner;

// import { useState, useEffect, useContext } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { AuthContext } from "../../context/AuthContext";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "moment-timezone";
// import { Link } from "react-router-dom";

// const localizer = momentLocalizer(moment);
// moment.tz.setDefault("Europe/Berlin");
// const API_URL = import.meta.env.VITE_API_URL;

// const RecipePlanner = ({ name, link, recipe_id }) => {
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const saveEventToServer = async (newEvent) => {
//       try {
//         const token = await user.getIdToken();
//         await fetch(`${API_URL}/planner`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newEvent),
//         });
//       } catch (error) {
//         console.error("Fehler beim Speichern des Events:", error);
//       }
//     };

//     const planRecipe = async () => {
//       if (selectedDate) {
//         const newEvent = {
//           uid: user.uid,
//           recipe_title: name,
//           date: moment(selectedDate).format("YYYY-MM-DD"),
//           recipe_id: recipe_id,
//           link: link,
//         };

//         await saveEventToServer(newEvent);

//         setEvents((prevEvents) => [
//           ...prevEvents,
//           { ...newEvent, start: selectedDate, end: selectedDate },
//         ]);
//         setSelectedDate(null);
//       }
//     };
//     planRecipe();
//   }, [selectedDate]);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const response = await fetch(`${API_URL}/planner`);
//         const savedEvents = await response.json();
//         const mappedEvents = savedEvents.map((event) => ({
//           ...event,
//           start: moment(event.date).startOf("day").toDate(),
//           end: moment(event.date).endOf("day").toDate(),
//           title: event.recipe_title,
//           recipe_id: event.recipe_id,
//         }));
//         console.log(mappedEvents);
//         setEvents(mappedEvents);
//       } catch (error) {
//         console.error("Fehler beim Abrufen der Events:", error);
//       }
//     }

//     fetchEvents();
//   }, [selectedDate]);

//   function handleEventClick(event) {
//     const urlLink = `recipedetails/${event.recipe_id}`;
//     window.open(urlLink, "_self");
//   }

//   return (
//     <div className="p-4">
//       {recipe_id && (
//         <h4 className="text-center text-2xl font-bold mb-4">
//           <Link to="/profile">Mein Profile</Link>
//         </h4>
//       )}

//       <div className="mt-8">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 400 }}
//           selectable
//           views={["month", "week"]}
//           defaultView="week"
//           onSelectSlot={(slotInfo) =>
//             recipe_id ? setSelectedDate(slotInfo.start) : null
//           }
//           onSelectEvent={handleEventClick}
//           eventPropGetter={() => ({
//             style: {
//               height: "auto",
//               fontSize: "0.8em",
//               padding: "3px",
//               lineHeight: "1.5em",
//               backgroundColor: "#a9c2bc",
//               color: "#323534",
//               borderRadius: "5px",
//               border: "none",
//               textAlign: "center",
//             },
//           })}
//         />
//       </div>

//       {selectedDate && recipe_id && (
//         <div className="flex justify-center mt-4">
//           {/* Button zur Rezeptplanung */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipePlanner;
