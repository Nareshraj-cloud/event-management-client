import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="badge">{event.category || "General"}</span>
        <span className="badge dept">{event.department}</span>
      </div>
      <h3>{event.title}</h3>
      <p className="event-meta">📅 {new Date(event.date).toDateString()} &nbsp; 🕒 {event.time}</p>
      <p className="event-meta">📍 {event.venue}</p>
      <Link to={`/events/${event.id}`} className="btn-link">View Details</Link>
    </div>
  );
};

export default EventCard;
