import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Scene3D from "../components/Scene3D";
import Mascot from "../components/Mascot";
import TiltCard from "../components/TiltCard";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "AI&DS",
    rollNumber: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <Scene3D />
      <div className="auth-panel">
        <Mascot />
        <TiltCard className="container form-container form-container-glow">
          <h2>Create Account</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
            {form.role === "student" && (
              <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} />
            )}
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </TiltCard>
      </div>
    </div>
  );
};

export default Register;
