import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Scene3D from "../components/Scene3D";
import Mascot from "../components/Mascot";
import TiltCard from "../components/TiltCard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <Scene3D />
      <div className="auth-panel">
        <Mascot />
        <TiltCard className="container form-container form-container-glow">
          <h2>Welcome Back</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </TiltCard>
      </div>
    </div>
  );
};

export default Login;
