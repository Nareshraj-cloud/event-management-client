import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await api.get("/events", { params: { upcoming: "true" } });
    const filtered = category === "All" ? data : data.filter((e) => e.category === category);
    setEvents(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <p style={{ color: "var(--fade)", marginTop: "-4px", marginBottom: "20px" }}>
        Department of Artificial Intelligence &amp; Data Science
      </p>
      <div className="filter-bar">
        <label>Filter by Type: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Events</option>
          <option value="Symposium">Symposium</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Awareness Program">Awareness Program</option>
          <option value="Cultural">Cultural</option>
          <option value="Technical">Technical</option>
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
