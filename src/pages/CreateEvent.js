import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    department: "AI&DS",
    date: "",
    time: "",
    venue: "",
    capacity: 100,
    amountPerPerson: 0,
    organizer: "",
    chiefGuest: "",
    activities: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/events", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="container form-container">
      <h2>Create New Event</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Event Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category (Workshop, Seminar, Fest...)" value={form.category} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} required />
        <input name="capacity" type="number" placeholder="Max Capacity" value={form.capacity} onChange={handleChange} min={1} required />

        <hr className="form-divider" />

        <input name="amountPerPerson" type="number" placeholder="Amount per Person (Rs, 0 if free)" value={form.amountPerPerson} onChange={handleChange} min={0} step="0.01" />
        <input name="organizer" placeholder="Organizer (e.g. Dept. of AI & DS)" value={form.organizer} onChange={handleChange} />
        <input name="chiefGuest" placeholder="Chief Guest" value={form.chiefGuest} onChange={handleChange} />
        <textarea name="activities" placeholder="What's conducted during the event (agenda / activities)" value={form.activities} onChange={handleChange} />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
