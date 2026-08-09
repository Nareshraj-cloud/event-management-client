import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const COMMITTEES = [
  { key: "discipline", label: "Discipline Committee", blurb: "Manages crowd flow and event conduct" },
  { key: "cash_collection", label: "Cash Collection Committee", blurb: "Handles entry fees and receipts" },
  { key: "refreshment", label: "Refreshment Committee", blurb: "Manages food and refreshments" },
];

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [committees, setCommittees] = useState({ discipline: [], cash_collection: [], refreshment: [] });
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  const fetchEvent = async () => {
    const { data } = await api.get(`/events/${id}`);
    setEvent(data);
  };

  const fetchCommittees = async () => {
    const { data } = await api.get(`/committees/${id}`);
    setCommittees(data);
  };

  useEffect(() => {
    fetchEvent();
    fetchCommittees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRegister = async () => {
    setMessage("");
    try {
      await api.post(`/registrations/${id}`);
      setMessage("Registered successfully! Check your email for confirmation.");
      setRegistered(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  const isMember = (committeeType) =>
    user && committees[committeeType]?.some((m) => m && m.id === user.id);

  const handleJoinCommittee = async (committeeType) => {
    try {
      await api.post(`/committees/${id}/join`, { committeeType });
      fetchCommittees();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not join committee");
    }
  };

  const handleLeaveCommittee = async (committeeType) => {
    try {
      await api.delete(`/committees/${id}/leave`, { data: { committeeType } });
      fetchCommittees();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not leave committee");
    }
  };

  const handleDeleteEvent = async () => {
    const confirmed = window.confirm(`Delete "${event.title}"? This can't be undone.`);
    if (!confirmed) return;
    try {
      await api.delete(`/events/${id}`);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not delete event");
    }
  };

  const canManage = user && (user.role === "admin" || (user.role === "faculty" && event?.createdBy?.id === user.id));

  if (!event) return <div className="container">Loading...</div>;

  return (
    <div className="container event-details">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <h1>{event.title}</h1>
        {canManage && (
          <button className="btn-outline btn-danger" onClick={handleDeleteEvent}>
            Delete Event
          </button>
        )}
      </div>
      <p className="event-meta">📅 {new Date(event.date).toDateString()} &nbsp; 🕒 {event.time}</p>
      <p className="event-meta">📍 {event.venue} &nbsp; 🏫 {event.department}</p>
      <p>{event.description}</p>

      <div className="detail-grid">
        <div className="detail-box">
          <span className="detail-label">Entry Fee</span>
          <span className="detail-value">
            {Number(event.amountPerPerson) > 0 ? `₹${event.amountPerPerson} / person` : "Free"}
          </span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Organizer</span>
          <span className="detail-value">{event.organizer || "—"}</span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Chief Guest</span>
          <span className="detail-value">{event.chiefGuest || "—"}</span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Capacity</span>
          <span className="detail-value">{event.capacity} seats</span>
        </div>
      </div>

      {event.activities && (
        <div className="activities-box">
          <h3>What's Happening</h3>
          <p>{event.activities}</p>
        </div>
      )}

      {message && <p className="info">{message}</p>}

      {user?.role === "student" && !registered && (
        <button onClick={handleRegister}>Register for this Event</button>
      )}
      {!user && <p>Please <a href="/login">login</a> to register.</p>}

      <div className="committee-section">
        <h3>Volunteer Committees</h3>
        <p className="committee-intro">Want to help run this event? Join a committee below.</p>
        <div className="committee-grid">
          {COMMITTEES.map((c) => {
            const members = (committees[c.key] || []).filter((m) => m);
            return (
              <div className="committee-card" key={c.key}>
                <h4>{c.label}</h4>
                <p className="committee-blurb">{c.blurb}</p>
                <p className="committee-count">{members.length} member(s)</p>
                {members.length > 0 && (
                  <ul className="committee-members">
                    {members.map((m) => (
                      <li key={m.id}>{m.name} <span className="committee-dept">({m.department})</span></li>
                    ))}
                  </ul>
                )}
                {user?.role === "student" && (
                  isMember(c.key) ? (
                    <button className="btn-outline" onClick={() => handleLeaveCommittee(c.key)}>Leave</button>
                  ) : (
                    <button className="btn-outline" onClick={() => handleJoinCommittee(c.key)}>Join</button>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;