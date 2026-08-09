import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SnowEffect from "../components/SnowEffect";

const DepartmentWelcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3200);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => navigate("/");

  const deptLine1 = "Department of";
  const deptLine2 = user?.department || "Artificial Intelligence & Data Science";

  return (
    <div className="welcome-screen">
      <SnowEffect lines={[deptLine1, deptLine2]} />
      <div className="welcome-content">
        <p className="welcome-eyebrow">Welcome{user ? `, ${user.name}` : ""}</p>
        {/* Visible heading spacer (the actual text is drawn by the snow canvas above) */}
        <h1 className="welcome-title snow-title-spacer" aria-label={`${deptLine1} ${deptLine2}`}>
          <span className="sr-only">{deptLine1} {deptLine2}</span>
        </h1>
        <p className="welcome-sub welcome-sub-delayed">Here's what's happening in the department right now.</p>
        {ready && (
          <button className="welcome-btn" onClick={handleContinue}>
            View Events
          </button>
        )}
      </div>
    </div>
  );
};

export default DepartmentWelcome;
