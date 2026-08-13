import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Scene3D from "../components/Scene3D";
import Mascot from "../components/Mascot";
import TiltCard from "../components/TiltCard";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message || "If that email is registered, a reset link has been sent.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Scene3D />
      <div className="auth-panel">
        <Mascot />
        <TiltCard className="container form-container form-container-glow">
          <h2>Forgot Password</h2>
          <p>Enter your email and we'll send you a link to reset your password.</p>
          {message && <p className="info">{message}</p>}
          {error && <p className="error">{error}</p>}
          {!message && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
          <p><Link to="/login">Back to Login</Link></p>
        </TiltCard>
      </div>
    </div>
  );
};

export default ForgotPassword;