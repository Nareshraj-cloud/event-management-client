import { useEffect, useState } from "react";
import api from "../services/api";

const MyEvents = () => {
  const [registrations, setRegistrations] = useState([]);

  const fetchMyEvents = async () => {
    const { data } = await api.get("/registrations/my");
    setRegistrations(data);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleCancel = async (eventId) => {
    await api.delete(`/registrations/${eventId}`);
    fetchMyEvents();
  };

  return (
    <div className="container">
      <h1>My Registered Events</h1>
      {registrations.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        <div className="event-grid">
          {registrations.map((reg) => (
            <div className="event-card" key={reg.id}>
              <h3>{reg.event.title}</h3>
              <p className="event-meta">📅 {new Date(reg.event.date).toDateString()} &nbsp; 🕒 {reg.event.time}</p>
              <p className="event-meta">📍 {reg.event.venue}</p>
              <p className="event-meta">Ticket: {reg.ticketNumber}</p>
              <button onClick={() => handleCancel(reg.event.id)}>Cancel Registration</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
