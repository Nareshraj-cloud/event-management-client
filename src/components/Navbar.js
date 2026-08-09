import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🎓 AI&amp;DS Events Portal</Link>
      <div className="nav-links">
        <Link to="/">Events</Link>
        {user && <Link to="/my-events">My Events</Link>}
        {user && (user.role === "faculty" || user.role === "admin") && (
          <Link to="/create-event">Create Event</Link>
        )}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <>
            <span className="user-tag">{user.name} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
